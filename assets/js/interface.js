class InterfaceLayer{
  constructor(name){
    this.name = name,
    this.props = {},
    this.div = document.createElement('div')
  }

  init(){
    VARIABLES.forEach( (name) =>{
      this.props[name] = 50;
    });
    this.render();
  }
  // property(name){
  //   return this[name];
  // }

  sliderElement(prop){
    return this.div.getElementsByClassName(prop)[0];
  }

  attachEvents(prop){
    let interfaceLayer = this;
    this.sliderElement(prop).addEventListener('change', function(e){
      interfaceLayer.setValue(prop, this.value);
      // set the new prop for the right layer
      // console.log(layers.props[interfaceLayer.name]);
      layers.props[interfaceLayer.name][prop] = interfaceLayer.getValue(prop);
      // console.log(layers.props[interfaceLayer.name]);
      layers.draw();
      // console.log(interfaceLayer.name, this.getAttribute('class'), interfaceLayer.getValue(prop));
    });
  }

  getValue(prop){
    return parseInt(this.props[prop]);
  }
  setValue(prop, value){
    this.props[prop] = value;
  }

  renderSlider(prop){
    let markup =
      `<div class="slider ${this.name}">
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value="${this.getValue(prop)}"
            data-orientation="horizontal"
            class="${prop}"><br>
          <h2>${prop}</h2>
        </div>
    `;
    return markup;
  }

  render(){

    this.div.setAttribute('class', 'layer');

    let markup = `<h1>${this.name}</h1>
                  `;
    VARIABLES.forEach( (prop) => {
      markup += this.renderSlider(prop);
    });

    this.div.innerHTML = markup;
    document.getElementById('interface').appendChild(this.div);

    VARIABLES.forEach( (prop) => {
      this.attachEvents(prop);
    });

  }
}

let interfaceLayers = {};
LAYERS.forEach((name) => {
  interfaceLayers[name] = new InterfaceLayer(name);
  interfaceLayers[name].init();
});


// EXPORT / IMPORT FEATURES

// close links for modals
Array.from(document.getElementsByClassName('close')).forEach( (close) => {
  close.addEventListener('click', function(e){
    e.preventDefault();
    this.parentNode.style.display = 'none';
  }, false);
});


let exportSettings = document.getElementById('export-settings');
exportSettings.addEventListener('click', function(e){
  e.preventDefault();
  // hide other modal
  let importWindow = document.getElementById('import-window');
  importWindow.style.display = 'none';
  // open modal containing interfaceLayers as object
  let exportWindow = document.getElementById('export-window');
  exportWindow.style.display = 'block';
  document.getElementById('export-content').innerHTML = JSON.stringify(interfaceLayers);
}, false);


let importSettings = document.getElementById('import-settings');
importSettings.addEventListener('click', function(e){
  e.preventDefault();
  // hide other modal
  let exportWindow = document.getElementById('export-window');
  exportWindow.style.display = 'none';
  // open modal containing interfaceLayers as object
  let importWindow = document.getElementById('import-window');
  importWindow.style.display = 'block';
  let importTextarea = document.getElementById('import-content');

  let importButton = document.getElementById('submit-import');
  importButton.addEventListener('click', function(e){
    let importContent;
    if(importTextarea.value != ''){
      importContent = JSON.parse(importTextarea.value);
    } else {
      console.log("empty textarea");
      return;
    }
    // if (typeof importContent === "object"){

      LAYERS.forEach( (layer) => {
        VARIABLES.forEach( (prop) => {
          let newValue = importContent[layer].props[prop];
          layers.props[layer][prop] = newValue;
          let slider = document.querySelector('.'+layer+' .'+prop);
          slider.value = newValue;
          interfaceLayers[layer].setValue(prop, newValue);
        });
      });
      layers.draw();
      // let interfaceLayers = {};
      // LAYERS.forEach((name) => {
      //   interfaceLayers[name] = new InterfaceLayer(name);
      //   VARIABLES.forEach( (v) => {
      //     interfaceLayers[name].props[v] = importContent[name].props[v];
      //   });
      //   interfaceLayers[name].render();
      // });
      // interfaceLayers = importContent;
    // }
  });

}, false);

document.getElementById('randomize').addEventListener('click', function(e){
  e.preventDefault();

  let inputs = Array.from(document.getElementsByTagName('input'));

  LAYERS.forEach( (layer) => {
    VARIABLES.forEach( (prop) => {
      let newValue = randInt(0, 100);
      layers.props[layer][prop] = newValue;
      let slider = document.querySelector('.'+layer+' .'+prop);
      slider.value = newValue;
      interfaceLayers[layer].setValue(prop, newValue);
    });
  });

  layers.draw();

}, false);
// interfaceLayers.layerName.getValue('name');

// interfaceLayers.bassline.setValue('disto', 75);
// console.log(interfaceLayers.bassline.getValue('disto'));
