
let dynamic = '';
let detail = '';
let selectedArticle = '';

let selectedTopic = '';
var articleJSON = getArticleJSON();

/*
fetch("./article.json") 
.then((response) => { return response.json(); }) 
.then((data) => console.log(data));
*/

dynamic = dynamic + `<div class="container"><div class="hero">`;
for (i = 0; i < articleJSON.length; i++) {

    //dynamic = dynamic + `<button type="button" onclick="selectionTopic(${i})" >${articleJSON[i].header}</button>`;
    
    dynamic = dynamic + `<span class="class="job-title" style="cursor: pointer; padding: 5px;" onclick="selectionTopic(${i})"><a> ${articleJSON[i].header.toUpperCase()}</a></span>`;
}
dynamic = dynamic + `</div></div>`;



function selectionTopic(index) {

    document.getElementById("mdcontainer").innerHTML = '';

    detail = '';

    detail = detail + `<div class="container"><div class="hero">`;

    for (i = 0; i < articleJSON[index].under.length; i++) {
        detail = detail + `<p class="link" onclick="selectArticle(${index}, ${i})">${articleJSON[index].under[i].header.toUpperCase()}</p>`;
    }

    detail = detail + `</div></div>`;

    document.getElementById("detailDOM").innerHTML = detail;
}

function selectArticle(selectedTopicIndex, selectedArticleIndex)
{
    const url = `https://sadikcihanayaz.github.io/md.htm?src=https://sadikcihanayaz.github.io/article/${articleJSON[selectedTopicIndex].path}/${articleJSON[selectedTopicIndex].under[selectedArticleIndex].path}/article.md`
    //const url = `file:///Users/sadikcihanayaz/projects/sadikcihanayaz.github.io/md.htm?src=https://sadikcihanayaz.github.io/article/${articleJSON[selectedTopicIndex].path}/${articleJSON[selectedTopicIndex].under[selectedArticleIndex].path}/article.md`;
    location.href = url;
}


document.getElementById("basicDOM").innerHTML = dynamic;





function getArticleJSON() {
    return [
        {
            "path": "javascript",
            "header": "javascript",
            "description": "javascript topic",
            "under": [
                {
                    "path": "objectBasics",
                    "header": "OBJECT BASICS",
                    "description": "OBJECT BASICS"
                },
                {
                    "path": "arrays",
                    "header": "ARRAYS",
                    "description": "ARRAYS"
                },
                {
                    "path": "advancedWorkingWithFunctions",
                    "header": "ADVANCED WORKING WITH FUNCTIONS",
                    "description": "ADVANCED WORKING WITH FUNCTIONS"
                },
                {
                    "path": "arrayslooping",
                    "header": "ITERATIVE OF ARRAYS",
                    "description": "ITERATIVE OF ARRAYS"
                },
                {
                    "path": "frameswindows3",
                    "header": "frameswindows3",
                    "description": "frames Windows3"
                }
            ]
        },
        {
            "path": "reactnative",
            "header": "react-native",
            "description": "react-native topic",
            "under": [
                {
                    "path": "reactnative1",
                    "header": "react-native-1",
                    "description": "react-native-1"
                }
            ]
        }
    ];
}