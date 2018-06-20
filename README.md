# solar-gen
Artwork generator based on music variables in SVG

##What it does
Basically this creates cool shapes and polygons based on musical variables (like amount of bass, volume of rythmic, distortion, etc.) You can then edit in Illustrator, InkScape, etc.

##Technical
* This is 95% pure JavaScript (ES6) that is (for now) browser-compiled with Babel.
* It uses very few php but still does, so if you intend to use it locally, **you'll need to set up a virtual server** like wamp or xamp (make sure it accepts php7).
* It also uses [SVG.js library](https://github.com/svgdotjs/svg.js) and a plugin called [svg.shapes.js](https://github.com/svgdotjs/svg.shapes.js/)

##Cool features
* You can hit **randomize** to make all cursors go random and quickly create unexpected results.
* You can **export JSON** data corresponding to a shape you like.
* You can **import JSON** data from a previously exported thing (or create your own at your own risk).
* You can **export to SVG** the whole shape, so you can basically make printable material out of it, or work on it on Illustrator, as it is valid and clean SVG markup.

##History
We started an internal multimedia project (music, graphic design, animation) called Solar Sound System. It was about visualizing electro music through shapes. The result was: 4 posters and a music video for a piece of music from H. It was done manually on Illustrator and After Effects.

Following this project, we wanted to make a generative version that would follow certain rules, certain variables that are related to music (bassline, melody, distortion, etc.). Then it evolved.

