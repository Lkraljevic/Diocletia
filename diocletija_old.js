// import {M1_themes} from 'themes';

function Model (modelEl, modelConfig) {

  this.name = modelConfig.name;
  this.nr_stripes = modelConfig.nr_stripes;
  if(!modelConfig.themes.default) {
    throw new Error ('Missing default teme');
  }
  this.themes = modelConfig.themes;
  this.currentTheme =  this.themes.default

  this.changeTheme = function(theme) {
    if(this.nr_stripes != theme.left.length || this.nr_stripes != theme.right.length)
      throw new Error("Invalid theme dimensions mismatch");
    this.currentTheme = theme;    
  }

  this.setColor = function(side, color, stripe_index) { 
    this.currentTheme[side][stripe_index] = color;
    this.updateDOM();
  }
  this.updateDOM = function updateDOM() {
    console.log(this.el);
  }
  this.initStripes = function(modelEl) {
    this.left_stripes = [];
    this.right_stripes = [];
    modelEl.querySelectorAll('.stripes').forEach(
      function(el) {
        el.onclick = function() {
          this.Astripe = 
        }
    })
  }


}
// Available colors: 
// "red", "green_light", "green_dark", "orange", "yellow", "crimson", "cyclamen", "purple"
var M1_config = {
  nr_stripes: 7,
  name: 'Model 1',
  themes: {
    "default": {
      left: ['green_dark', 'green_dark', 'green_dark', 'green_dark', 'green_dark', 'green_dark', 'yellow'],
      right: ['green_light', 'green_dark', 'green_light', 'green_dark', 'green_light', 'green_dark', 'red'],
    },
    "test2": {
      left: ['orange', 'green_dark', 'green_dark', 'orange', 'green_dark', 'green_dark', 'yellow'],
      right: ['green_light', 'orange', 'green_light', 'green_dark', 'green_light', 'orange', 'red'],  
    },
    "test3": {
      left: ['orange', 'crimson', 'crimson', 'orange', 'crimson', 'crimson', 'crimson'],
      right: ['green_light', 'crimson', 'crimson', 'green_dark', 'crimson', 'crimson', 'crimson'],  
    }
  }
}




//
// Cart structure
//
// items:[itemObject]
// total:[]
// functions: add, remove, quantity 
