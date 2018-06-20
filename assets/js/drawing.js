let lines = [];

class Layers{
  constructor(props){
    this.props = props,
    // base unit
    this.u = 28,
    this.edges = 36 - Math.floor(0.36 * parseInt(this.props.bassline.disto)) + 4,
    this.ngonAngle = (this.edges-2) * 180 / this.edges,
    this.radiusMultiple = 1,
    this.polyMultiple = 1,
    this.xDividor = 1,
    this.flattener = 3,
    this.offsetX = 240,
    this.offsetY = 180
  }
  init(){
    // create ngons
    // create inner lines

    this.draw();
  }

  drawBG(){
    let rect = board.rect(drawWidth, drawHeight).attr({fill: '#050505'});
  }

  setEdges(){
    this.edges = 36 - Math.floor(0.36 * parseInt(this.props.bassline.disto)) + 4;
    this.ngonAngle = (this.edges-2) * 180 / this.edges;
  }

  // draw the spikey perspective lines
  // frequency is the frequency of spikes / flat lines
  drawNgon(sides, radius, frequency, color){
    let vertices = [];

    // the higher number the higher the spike
    let spikeAmount = 1.05;

    // base unit for x/y offset
    let u = 5;

    // calculate vertices
    for (let i=0; i<sides; i++){
      let angle = 360 / sides;
      // Math.PI to convert into radians for Math.cos()
      angle = angle * Math.PI / 180;

      // modify polygon for straight lines
      // and spikes
      switch (i%frequency){
        case 1:
          vertices[i] = [radius/spikeAmount * Math.cos( 90 - angle * i),
                         radius/spikeAmount * Math.sin( 90 - angle * i )];
        break;
        case 3:
          vertices[i] = [( radius * Math.cos( 90 - angle * (i-1) ) + radius * Math.cos( 90 - angle * (i+1) )) /2,
                         ( radius * Math.sin( 90 - angle * (i-1) ) + radius * Math.sin( 90 - angle * (i+1) )) /2]
        default :
          vertices[i] = [radius * Math.cos( 90 - angle *i ),
                         radius * Math.sin( 90 - angle *i )];
        break;
      }
      // vertices[i][0] += u*radius*this.xDividor;
      // vertices[i][1] += (u*radius*this.polyMultiple) / this.flattener;
    }

    let ngon = board.polygon(vertices);
    let flattenerOffset = this.flattener > 1 ? radius * this.flattener / 4 : 0;
    ngon.move((-1 * radius) + this.offsetX,
              (-1 * radius) + this.offsetY + flattenerOffset);

    ngon.attr({
      stroke:           color,
      'stroke-width':   2,
      fill:             'none'
    });
  }

  drawMelody(){
    let melody = this.props.melody;

    let bass = parseInt(melody.bass);
    let color = rgbaInterval([0, 204, 255, 1],
                             [255, 200, 0, 1],
                             bass);
    let nb = Math.round(melody.volume / 2); // default 25
    let sides = Math.floor(melody.wet) + 4;
    let r = 25;
    // let rSpacing = 15;
    let frequency = Math.round(Math.pow(Math.round((100 - melody.disto) / 5), 2) /10) + 2;

    for (let i=0; i<nb; i++){
      // sides, radius, frequency, color
      this.drawNgon(sides,
                    r*i,
                    // r + r*i*this.radiusMultiple,
                    frequency, 
                    color);
    }

  }

  drawBass(){
    let bassline = this.props.bassline;
    let u = this.u;
    let nbOfNgons = bassline.volume/u*10;

    if (nbOfNgons < 1){
      return;
    }

    let bass = parseInt(bassline.bass);
    let color = rgbaInterval([100, 0, 100, 1],
                             [255, 50, 0, 1],
                             bass);
    let polys = [];
    this.setEdges();

    // polys group all the ngons and their properties
    for(let i = 1 ; i < nbOfNgons ; i++){
      polys[i] = board.polygon().ngon({
        // radius:    u*i,
        radius:    u*i*this.radiusMultiple,
        edges:     this.edges
      });
      // polys[i].x(-u*i);
      polys[i].x(-u*i/this.xDividor + this.offsetX);
      polys[i].y(-u*i*this.polyMultiple / this.flattener + this.offsetY);
      // polys[i].y(-u*i*3 / this.flattener);
      // polys[i].x(drawWidth - u*i + 100);
      // polys[i].y(-200);
      polys[i].attr({
        stroke:           color,
        'stroke-width':   bassline.wet/20,
        fill:             'none'
      });
      // polys[i]._array.value[i] = [0, 0];
    }

    let nbVertices = polys[1]._array.value.length;

    for (let x = 0; x < nbVertices; x++){
      lines[x] = [];
      polys.forEach( (poly) => {
        lines[x].push((poly._array.value[x]));
      });
    }

    // add new interpolated coords for outside the polygon
    // for each line
    //   take first 2 coords
    //   calculate the x, y offset
    //   push i new values
    lines.forEach( (line) => {
      if(typeof line[1] !== 'undefined'){
        let offsetX = line[1][0] - line[0][0];
        let offsetY = line[1][1] - line[0][1];

        // change this nb for more/less interpolated coords
        let additionalNb = 8;

        for (let i = 0; i < additionalNb ; i++){
          let newCoords = [];
          let last = line[line.length-1];
          newCoords.push(last[0]+offsetX, last[1]+offsetY);
          line.push(newCoords);
        }
      }
      else{
        // not enough lines to calculate an offset
        return;
      }
    });
  }

  drawRythmic(){
    let rythmic = this.props.rythmic;
    let bass = parseInt(rythmic.bass);
    let color = rgbaInterval([255, 255, 255, 1],
                             [255, 255, 0, 1],
                             bass);

    lines.forEach( (line) => {
      let nbStrokes = parseInt(line.length / 100 * rythmic.volume);
      nbStrokes = randInt(Math.floor(nbStrokes/1.25), nbStrokes);
      // base strokes for rythm alternate
      for(let i = 0; i < nbStrokes-1; i = i+2){
        if(line[i][0] == 0 &&
           line[i][1] == 0){
          return false;
        }
        line.polyLine = board.line(line[i][0], line[i][1],
                                   line[i+1][0], line[i+1][1]);
        // line.polyLine = board.line(line[i][0]+this.offsetX, line[i][1]+this.offsetY,
        //                            line[i+1][0]+this.offsetX, line[i+1][1]+this.offsetY);
        line.polyLine.attr({
          stroke:         color,
          'stroke-width': rythmic.wet/50 + 1,
          fill:           'none'
        });
        // console.log("line:", line);
        // console.log("polyline:", line.polyLine);
      }
      // we fill the gap if disto
      for(let i = 1; i < nbStrokes-2; i = i+2){
        // the more disto, the more chance to fill in the gaps
        if (randInt(0, rythmic.disto) > 40){
          line.polyLine = board.line(line[i][0], line[i][1], line[i+1][0], line[i+1][1]);
          line.polyLine.attr({
            stroke:         '#ffffff',
            'stroke-width': rythmic.wet/50 + 1,
            fill:           'none'
          });
        }
      }
    });

    // small circles
    // they start at the polygon's center
    // and randomly stop and moves to the next line
    // uses the bass amount in rythmic
    let circlesColor = rgbaInterval([0, 50, 150, 1],
                             [255, 0, 255, 1],
                             bass);
    let bassAmount = Math.round(bass / 7);
    lines.forEach( (line) => {
      let lineStop = Math.floor(Math.random() * (bassAmount)) || 0;

      line.forEach( (coords) => {
        if (line.indexOf(coords) > lineStop){
          return;
        }
        line.circle = board.circle(8);
        line.circle.attr({
          cx:             coords[0],
          cy:             coords[1],
          stroke:         circlesColor,
          'stroke-width': 1,
          fill:           'none'
        });
      });
    });
  }

  draw(){
    board.clear();
    this.drawBG();
    this.drawBass();
    this.drawRythmic();
    this.drawMelody();
  }
}

let board = SVG('drawing');

let layers = new Layers({
              bassline: {
                bass:       50,
                wet:        50,
                disto: 50,
                volume:     50
              },
              rythmic: {
                bass:       50,
                wet:        50,
                disto: 50,
                volume:     50
              },
              melody: {
                bass:       50,
                wet:        50,
                disto: 50,
                volume:     50
              },
              ambient: {
                bass:       50,
                wet:        50,
                disto: 50,
                volume:     50
              },
             });

layers.init();

window.addEventListener('resize', function(){
  drawWidth = drawing.offsetWidth;
  drawHeight = drawing.offsetHeight;
  layers.draw();
});


// for SVG export
let exportLink = document.getElementById('export-link');
exportLink.addEventListener('click', function(event){
  event.preventDefault();
  (function (){
    var e = document.createElement('script');
    e.setAttribute('src', BASEURL + 'local_cdn/svg-crowbar-2.js'); 
    e.setAttribute('class', 'svg-crowbar'); 
    document.body.appendChild(e); 
  })();
}, false);
