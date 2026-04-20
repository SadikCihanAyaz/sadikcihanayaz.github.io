#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DATA_DIR = path.join(ROOT, 'data');
const CATEGORIES_PATH = path.join(DATA_DIR, 'categories.json');
const OUTPUT_PATH = path.join(DATA_DIR, 'search-index.json');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function resolveWebPath(webPath) {
  if (!webPath || typeof webPath !== 'string' || !webPath.startsWith('/')) {
    throw new Error(`Gecersiz web path: ${webPath}`);
  }
  return path.join(ROOT, webPath.slice(1));
}

function trimAndCollapse(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function firstLine(value) {
  return trimAndCollapse(String(value || '').split('\n').find((line) => line.trim()) || '');
}

function limitText(value, maxLen = 4200) {
  const normalized = trimAndCollapse(value);
  if (normalized.length <= maxLen) {
    return normalized;
  }
  return normalized.slice(0, maxLen);
}

function normalizeForSearch(text) {
  return String(text || '')
    .replace(/[ıİ]/g, 'i')
    .replace(/[ğĞ]/g, 'g')
    .replace(/[şŞ]/g, 's')
    .replace(/[çÇ]/g, 'c')
    .replace(/[öÖ]/g, 'o')
    .replace(/[üÜ]/g, 'u')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function toInterviewUrl({ categoryId, subcategoryId, interviewId, questionId }) {
  const params = new URLSearchParams({
    category: categoryId,
    subcategory: subcategoryId,
    interview: interviewId,
    question: questionId
  });
  return `/interview.html?${params.toString()}`;
}

function toTopicUrl({ categoryId, subcategoryId }) {
  const params = new URLSearchParams({
    category: categoryId,
    subcategory: subcategoryId,
    view: 'topic'
  });
  return `/learn.html?${params.toString()}`;
}

function collectTopicText(topic) {
  const chunks = [];
  chunks.push(topic?.title || '');

  for (const block of topic?.blocks || []) {
    chunks.push(block?.title || '');
    chunks.push(block?.text || '');

    if (Array.isArray(block?.items)) {
      chunks.push(block.items.join(' '));
    }

    if (typeof block?.code === 'string') {
      chunks.push(block.code);
    }
  }

  return limitText(chunks.join(' '));
}

function collectQuestionText(question) {
  const chunks = [];
  chunks.push(question?.question || '');
  chunks.push(question?.questionCode || '');
  chunks.push(question?.starterCode || '');
  chunks.push(question?.answerBody || '');
  chunks.push(question?.answerCode || '');

  if (Array.isArray(question?.choices)) {
    for (const choice of question.choices) {
      chunks.push(choice?.text || '');
    }
  }

  if (Array.isArray(question?.optionExplanations)) {
    for (const exp of question.optionExplanations) {
      chunks.push(exp?.text || '');
    }
  }

  return limitText(chunks.join(' '));
}

function buildSearchIndex() {
  if (!fs.existsSync(CATEGORIES_PATH)) {
    throw new Error('categories.json bulunamadi.');
  }

  const categories = readJson(CATEGORIES_PATH).categories || [];
  const items = [];

  for (const category of categories) {
    const categoryId = String(category.id || '');
    const categoryTitle = String(category.title || categoryId || 'Category');
    const subcategoriesPath = resolveWebPath(category.subcategoriesFile);

    if (!fs.existsSync(subcategoriesPath)) {
      throw new Error(`Subcategory dosyasi yok: ${category.subcategoriesFile}`);
    }

    const subcategories = readJson(subcategoriesPath).subcategories || [];

    for (const subcategory of subcategories) {
      const subcategoryId = String(subcategory.id || '');
      const subcategoryTitle = String(subcategory.title || subcategoryId || 'Subcategory');
      const topicFile = subcategory.topicFile ? resolveWebPath(subcategory.topicFile) : null;
      const interviewsIndexPath = resolveWebPath(subcategory.interviewsFile);

      if (categoryId !== 'questions' && topicFile && fs.existsSync(topicFile)) {
        const topic = readJson(topicFile);
        const topicTitle = firstLine(topic?.title) || `${subcategoryTitle} Konu Anlatimi`;
        const topicMeta = `${categoryTitle} / ${subcategoryTitle} / Konu`;
        const topicSearchSource = [
          categoryTitle,
          subcategoryTitle,
          subcategory.description || '',
          topicTitle,
          collectTopicText(topic)
        ].join(' ');

        items.push({
          id: `topic:${categoryId}:${subcategoryId}`,
          kind: 'topic',
          title: topicTitle,
          meta: topicMeta,
          url: toTopicUrl({ categoryId, subcategoryId }),
          search: normalizeForSearch(topicSearchSource)
        });
      }

      if (!fs.existsSync(interviewsIndexPath)) {
        throw new Error(`Interview index dosyasi yok: ${subcategory.interviewsFile}`);
      }

      const interviews = readJson(interviewsIndexPath).interviews || [];
      for (const interviewMeta of interviews) {
        const interviewId = String(interviewMeta.id || '');
        const interviewTitle = String(interviewMeta.title || interviewId || 'Interview');
        const interviewFilePath = resolveWebPath(interviewMeta.file);

        if (!fs.existsSync(interviewFilePath)) {
          throw new Error(`Interview dosyasi yok: ${interviewMeta.file}`);
        }

        const interview = readJson(interviewFilePath);
        const questions = interview.questions || [];

        for (let i = 0; i < questions.length; i += 1) {
          const question = questions[i];
          const questionId = String(question?.id || `q${i + 1}`);
          const questionLabel = `Soru ${i + 1}`;
          const rawTitle = firstLine(question?.question || '');
          const title = rawTitle || `${interviewTitle} - ${questionLabel}`;
          const meta = `${categoryTitle} / ${subcategoryTitle} / ${interviewTitle} / ${questionLabel}`;

          const searchSource = [
            categoryTitle,
            subcategoryTitle,
            interviewTitle,
            questionLabel,
            title,
            collectQuestionText(question)
          ].join(' ');

          items.push({
            id: `question:${categoryId}:${subcategoryId}:${interviewId}:${questionId}`,
            kind: 'question',
            title,
            meta,
            url: toInterviewUrl({ categoryId, subcategoryId, interviewId, questionId }),
            search: normalizeForSearch(searchSource)
          });
        }
      }
    }
  }

  return {
    version: 1,
    generatedAt: new Date().toISOString(),
    minChars: 4,
    maxResults: 30,
    totalItems: items.length,
    items
  };
}

function run() {
  const index = buildSearchIndex();
  fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify(index, null, 2)}\n`, 'utf8');
  console.log(`Search index generated: ${index.totalItems} kayit -> ${path.relative(ROOT, OUTPUT_PATH)}`);
}

run();
