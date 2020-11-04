console.log("app.js", $);

// shared url... anyone with that url can open the sheet in google sheets
const sheetURL =
  "https://docs.google.com/spreadsheets/d/17g2XPR7udYLKwDvOmYw0IfEqXHgZtaTuWMKwoBO0iSI/edit?usp=sharing";

//sheetAsJSON is how we pull the data as JSON (javascript object notation)
let sheetAsJSON =
  "https://spreadsheets.google.com/feeds/list/17g2XPR7udYLKwDvOmYw0IfEqXHgZtaTuWMKwoBO0iSI/od6/public/values?alt=json";

//17g2XPR7udYLKwDvOmYw0IfEqXHgZtaTuWMKwoBO0iSI

//.ajax returns a Promise and a Promis is resolved using .then()
console.log("running before ajax");
$.ajax({
  url: sheetAsJSON,
})
  .then((data) => {
    console.log("data", data);
    const projects = data.feed.entry.map((project) => {
      return {
        title: project.gsx$title.$t,
        image: project.gsx$image.$t,
        description: project.gsx$description.$t,
        url: project.gsx$url.$t,
      };
    });
    app(projects);
  })

  //.catch is meant to deal with errors
  .catch((err) => console.log("err", err));
console.log("running after ajax");

function app(projectsArr) {
  console.log("app-projects", projectsArr);
  projectsArr.forEach((project) => {
    let $div = $("<div>").attr("class", "card");
    let $title = $("<h5>").text(project.title).attr("class", "card-title");
    let $img = $("<img>")
      .attr("src", project.image)
      .attr("class", "card-img-top");
    let $description = $("<p>")
      .text(project.description)
      .attr("class", "card-text");
    let $link = $("<a>")
      .text("Go")
      .attr("href", project.url)
      .attr("class", "btn btn-primary");
    $div.append($title, $img, $description, $link);
    $(".work-container").append($div);
  });
}
