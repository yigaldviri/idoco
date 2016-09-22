var container = document.getElementById('container');
var graphMeasurement = document.getElementById('graph-measurement');

var allCircles = document.getElementsByTagName('circle');
var allLines = document.getElementsByTagName('line');

//console.log(topSVGNode)

TweenMax.set(container, {
  position: 'absolute',
  xPercent: -50,
  left: '50%',
  top: '50%',
  yPercent: -50,
  backgroundColor: 'rgba(30,39,38,0.3)',
  borderRadius: 10,
  padding: 40
})

var destArray = [15, 52, 28, 170, 105, 93, 44, 122, 179, 170, 220];


TweenMax.set(allCircles, {
  attr: { fill: '#954CE9', r: 5 },
  transformOrigin: '50% 50%',
  scale: 0
})
TweenMax.set([allLines], {
  attr: { stroke: '#18B5DD' },
  drawSVG: '100% 100%',
  strokeWidth: 2
})
TweenMax.set([graphMeasurement], {
  attr: { stroke: '#18B5DD' },
  drawSVG: '100% 100%',
  strokeWidth: 1
})

TweenMax.set([allCircles, allLines], {
  y: '+=300'
})

TweenMax.set(graphMeasurement, {
  y: '+=280',
  alpha: 0.3
})
TweenMax.to(graphMeasurement, 3, {
  drawSVG: '0% 100%',
  delay: 1,
  ease: Power2.easeInOut
})
TweenMax.set('svg', {
  alpha: 1
})
for (var i = 0; i < allCircles.length; i++) {

  TweenMax.to(allCircles[i], 2, {
    attr: { cy: '-=' + destArray[i] },
    onUpdate: moveLines,
    onUpdateParams: [i],
    delay: i / 5,
    ease: Power4.easeInOut
  })
  if (allLines[i]) {

    TweenMax.to(allLines[i], 1, {
      drawSVG: '400',
      delay: i / 5,
      ease: Power4.easeInOut
    })
  }

  TweenMax.to(allCircles[i], 1, {
    scale: 1,
    delay: i / 5,
    ease: Power4.easeInOut
  })

}

function moveLines(i) {

  if (allLines[i]) {

    TweenMax.set(allLines[i], {
      attr: {
        'x2': allCircles[i].getAttribute('cx'), 'y2': allCircles[i].getAttribute('cy')
      }
    })
    TweenMax.set(allLines[i], {
      attr: {
        'x1': allCircles[i + 1].getAttribute('cx'), 'y1': allCircles[i + 1].getAttribute('cy')
      }
    })


  }
}

var tooltip = d3.selectAll(".tooltip");
var HTMLabsoluteTip = d3.select("div.tooltip.absolute");
var HTMLfixedTip = d3.select("div.tooltip.fixed");
var HTMLmouseTip = d3.select("div.tooltip.mouse");
var SVGexactTip = d3.select("g.tooltip.exact");
var SVGmouseTip = d3.select("g.tooltip.mouse");


var circles = d3.select("svg").select("g")
  .selectAll("circle");

/***** Easy but ugly tooltip *****/
circles.append("title")
  .text("Automatic Title Tooltip");

circles.on("mouseover", function () {
  tooltip.style("opacity", "1");

  tooltip.style("color", this.getAttribute("fill"));


  var matrix = this.getScreenCTM()
    .translate(+this.getAttribute("cx"),
    +this.getAttribute("cy"));

  //You can use screen coordinates directly to position
  //a fixed-position tooltip        
  HTMLfixedTip
    .style("left",
    (matrix.e) + "px")
    .style("top",
    (matrix.f + 3) + "px");
  //The limitation of fixed position is that it won't
  //change when scrolled.

  //A better solution is to calculate the position 
  //of the page on the screen to position an 
  //absolute-positioned tooltip:
  HTMLabsoluteTip
    .style("left",
    (window.pageXOffset + matrix.e) + "px")
    .style("top",
    (window.pageYOffset + matrix.f + 30) + "px");

})
  .on("mousemove", function () {

    var mouseCoords = d3.mouse(
      SVGmouseTip.node().parentNode);


    SVGmouseTip
      .attr("transform", "translate("
      + (mouseCoords[0] - 10) + ","
      + (mouseCoords[1] - 10) + ")");

    HTMLmouseTip
      .style("left", Math.max(0, d3.event.pageX - 150) + "px")
      .style("top", (d3.event.pageY + 20) + "px");
  })
  .on("mouseout", function () {
    return tooltip.style("opacity", "0");
  });

var circleGroup = d3.select("g#circle-group");
d3.select("button#wiggle").on("click", function () {
  circleGroup.transition().duration(1000)
    .attr("transform",
    "rotate(" + (20 * (Math.random() - 0.5)) + ")"
    + "translate(" + (20 * (Math.random() - 0.5)) + ","
    + (20 * (Math.random() - 0.5)) + ")"
    );
});