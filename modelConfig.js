// Available colors: 
// "red", "green_light", "green_dark", "orange", "yellow", "crimson", "cyclamen", "purple"
export  M1_config = {
  nr_strips: 7,
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