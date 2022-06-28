
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

for (i = 0; i < articleJSON.length; i++) {

    dynamic = dynamic + `<button type="button" onclick="selectionTopic(${i})" >${articleJSON[i].header}</button>`;

}



function selectionTopic(index) {

    detail = '';

    detail = detail + `<div style="height: 30%; width: 100%; overflow: auto;">`;

    for (i = 0; i < articleJSON[index].under.length; i++) {
        detail = detail + `<p style="color: blue; text-shadow: 1px 0px;" onclick="selectArticle(${index}, ${i})">${(i+1) + `. ` + articleJSON[index].under[i].header.toUpperCase()}</p>`;
    }

    detail = detail + `</div>`;

    document.getElementById("detailDOM").innerHTML = detail;
}

function selectArticle(selectedTopicIndex, selectedArticleIndex)
{
    const url = `https://sadikcihanayaz.github.io/md.htm?src=https://sadikcihanayaz.github.io/article/${articleJSON[selectedTopicIndex].path}/${articleJSON[selectedTopicIndex].under[selectedArticleIndex].path}/article.md`
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
                    "path": "frameswindows",
                    "header": "frameswindows",
                    "description": "frames Windows"
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
                    "path": "frameswindowsBB1",
                    "header": "frameswindowsBB1",
                    "description": "frames WindowsBB 1"
                }
            ]
        }
    ];
}