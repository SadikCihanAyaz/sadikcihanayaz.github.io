
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

    window.console.log('working!!');

    dynamic = dynamic + `<button type="button" onclick="selectionTopic(${i})" >${articleJSON[i].header}</button>`;

}



function selectionTopic(index) {

    detail = '';

    for (i = 0; i < articleJSON[index].under.length; i++) {
        detail = detail + `<p onclick="selectArticle(${index}, ${i})">${articleJSON[index].under[i].header}</p>`;
    }

    window.console.log(detail);
    document.getElementById("detailDOM").innerHTML = detail;
}

function selectArticle(selectedTopicIndex, selectedArticleIndex)
{
    window.console.log(selectedTopicIndex);
    window.console.log(selectedArticleIndex);
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
                    "path": "frameswindows2",
                    "header": "frameswindows2",
                    "description": "frames Windows2"
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