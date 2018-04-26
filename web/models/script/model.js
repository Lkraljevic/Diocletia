// Init new model
function Model (modelEl, modelConfig) {
    
    this.code = modelConfig.code;
    this.modelEl = modelEl;
  
    this.name = modelConfig.name;
    this.sale_price = modelConfig.sale_price;
    this.nr_strips = modelConfig.nr_strips;
    this.themes = modelConfig.themes;
  
    
    this.currentTheme =  JSON.parse(JSON.stringify(this.themes.default))
    this.activeStrip = null;
    this.activeColor = null;
  
  
    this.changeTheme = function(theme) {
      this.currentTheme = JSON.parse(JSON.stringify(theme));
      this.updateDOM();
    }
  
    this.changeColor = function() { 
  
      if(this.activeStrip && this.activeColor){
          var data = this.extractID(this.activeStrip.id);
          this.currentTheme[data.side][data.index] = this.activeColor;
          this.updateDOM();
        }
    }
  
    this.updateDOM = function updateDOM() {
      var that = this;
      this.stripsEl.forEach(function(el) {
        data = that.extractID(el.id);
        el.classList.forEach(function(className) {
          if(className != 'strips')
          el.classList.remove(className)
        });
        el.classList.add(that.colorParser(that.currentTheme[data.side][data.index]));
        
      })
      //this.activeStrip = null;
      this.setActiveStrip(null);
      this.activeColor = null;
    }
  
    this.initStrips = function(modelEl) { 
      var that = this;
      this.stripsEl = [];
      modelEl.querySelectorAll('.strips').forEach(
        function(el) {
          that.stripsEl.push(el);
          el.onclick = function(data) {
            that.setActiveStrip(this);
          }
      })
    }
  
    this.setActiveStrip = function(strip) {
      
      if(strip) {
        strip.classList.add('active');
        this.modelEl.classList.add('focused')
      } else 
      this.modelEl.classList.remove('focused');
  
      if(this.activeStrip && this.activeStrip != strip)
        this.activeStrip.classList.remove('active')
  
      this.activeStrip = strip;
      console.log(this.activeStrip);
      this.changeColor();
    }
  
    this.setActiveColor = function(color) {
      this.activeColor = color;
      console.log(this.activeColor);
      this.changeColor();
    }
  
    this.extractID = function(id) {
      var data = id.split('.');
      return {
        side : data[0] == 1 ?'l':'r',
        index : data[1]-1,
      }
    }
  
    this.colorParser = function(colors_code) {
      if(!Array.isArray(colors_code))
        colors_code = [colors_code];
      var config = {
           'r1':'red',
           'g1':'green_light',
           'g2':'green_dark' ,
           'o1':'orange',
           'y1':'yellow',
           'c1':'crimson',
           'c2':'cyclamen',
           'p1':'purple'
         } 
  
       var colors_name = colors_code.map(function(color_code) {
            if (config[color_code]) return config[color_code];
            else return 'default';
       });
       if (colors_name.length > 1) return colors_name;
       else return colors_name[0];
    }
  
    this.initStrips(modelEl);
    this.changeTheme(this.currentTheme);
  
}


// Init new ColorPicker
function ColorPicker (model) {

    var colors_palete = document.getElementById('colors');
    colors_palete.querySelectorAll('.item__color').forEach(function(el){
        el.onclick = function(e) {
            e.preventDefault();
            if(window.activeModel)
            window.activeModel.setActiveColor(colorCoder(el.dataset.color));
        };
    })
    function colorCoder(color) {
        var config = {
                'red':'r1',
                'green_light':'g1',
                'green_dark' :'g2',
                'orange':'o1',
                'yellow':'y1',
                'crimson':'c1',
                'cyclamen':'c2',
                'purple':'p1'
        } 
        return config[color] || 'default';
    }
}

//
// DEFINE MODEL CONFIGS
//
//


M1Config = {
    code: 'M1',
    nr_strips: 7,
    sale_price: {
      price: 400,
      currency: 'EUR'
    },
    name: 'Model I',
    themes: {
      "default": {
        l: ['g2', 'g2', 'g2', 'y1', 'o1', 'c2', 'c2'],
        r: ['g1', 'g1', 'g1', 'o1', 'y1', 'c1', 'c1']
      },
      "test2": {
        l: ['g2', 'g2', 'g2', 'g2', 'g2', 'g2', 'g2'],
        r: ['r1', 'r1', 'r1', 'r1', 'r1', 'r1', 'r1']
      },
      "test3": {
        l: ['r1', 'r1', 'r1', 'r1', 'r1', 'r1', 'r1'],
        r: ['g2', 'g2', 'g2', 'g2', 'g2', 'g2', 'g2']
      }
    }
}

M2Config = {
    code: 'M2',
    nr_strips: 4,
    sale_price: {
      price: 400,
      currency: 'EUR'
    },
    name: 'Model II',
    themes: {
      "default": {
        l: ['g2', 'g2', 'g2', 'y1'],
        r: ['g1', 'g1', 'g1', 'o1']
      },
      "test2": {
        l: ['g2', 'g2', 'g2', 'g2'],
        r: ['r1', 'r1', 'r1', 'r1']
      },
      "test3": {
        l: ['r1', 'r1', 'r1', 'r1'],
        r: ['g2', 'g2', 'g2', 'g2']
      }
    }
}

window.addEventListener("load", function(){
    locationHashChanged();
    ColorPicker();
});


window.addEventListener("hashchange", locationHashChanged, false);

function locationHashChanged() {
    console.log('hashChanged', location.hash)
    var modelWrapper = document.getElementById('model');
    if(!modelWrapper) return;
    removeModel();

    switch(location.hash) {
        case "#model-I": 
        loadScript('./script/m1.js', function() {
            addModel({
                el: M1El,
                config: M1Config
            });
        });
        
        break;
        case "#model-II": 
        loadScript('./script/m2.js', function() {
            addModel({
                el: M2El,
                config: M2Config
            });
        });
        break;
        default:
            location.hash = "#model-I";
    }
    
    function removeModel() {
        if(!window.activeModel) return
        modelWrapper.removeChild(window.activeModel.modelEl.parentElement);
        window.activeModel = null;
    }

    function addModel(model) {
        if(!model || !model.el || !model.config) throw new Error('Invalid params');

        modelWrapper.prepend(model.el);
        var svg = model.el.querySelector('svg');
        window.activeModel = new Model(svg, model.config);
        loadModelList();
    }

    function loadModelList() {
        
        if(!window.activeModel) return;
        var list = [
            {code:'M1',name:'Model I', hash:'#model-I'},
            {code:'M2',name:'Model II', hash:'#model-II'},
            {code:'M3',name:'Model III', hash:'#model-III'},
            {code:'M4',name:'Model IV', hash:'#model-IV'},
        ].filter(function(m){if(m.code != window.activeModel.code) return m });
        
        // Render list
        var listHTML = Handlebars.templates["model-list"]({models:list});
        document.getElementById('model-list').innerHTML = listHTML;
        
        
        // Scroll make up :)
        var models = document.querySelectorAll('.card-model');
        models.forEach(function(m){
          m.onclick = function(e) {
            location.hash = e.dataset.hash;
            var target = window.activeModel ? window.activeModel.modelEl: null;
            if( target) {
              var scroll = new SmoothScroll();
              scroll.init({offset:-300})
              scroll.animateScroll( target );

            }
          }
        });
      
    }
    
}

function loadScript(url, callback){

    var script = document.createElement("script")
    script.type = "text/javascript";
    script.onload = function(){ callback();};
    script.src = url;
    document.head.appendChild(script);
    return script;
}
