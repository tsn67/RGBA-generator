

class Slider {
    constructor(color, path, element, container, label) {
      this.color = color;
      this.isDragging = false;
      this.value = 0;
      this.path = path;
      this.element = element;
      this.container = container;
      this.label = label;
      this.temp = 0;
      this.isFirst = false;
  
      this.element.mousedown(() => {
        this.isDragging = true;
      });
  
      this.container.mouseup(() => {
        if (this.isDragging) {
          this.isDragging = false;
          this.isFirst = true;
        }
      });
  
      this.container.mouseleave(() => {
        if (this.isDragging) {
          this.isDragging = false;
          this.isFirst = true;
        }
      });
  
      this.container.mousemove((event) => {
        if (this.isDragging) {
          var position1 = this.path.offset();
          var position2 = this.element.offset();
  
          if (this.isFirst) {
            this.temp = event.pageX - position2.left;
            this.isFirst = false;
          }
  
          var xValue = parseInt(event.pageX - position1.left - this.temp);
          if (xValue < 0 || xValue > 255) {
            if (xValue < 0) xValue = 0;
            else if (xValue > 255) xValue = 255;
          }
          this.value = xValue;
          this.element.css("left", xValue + "px");
          this.updateGetValue(xValue);
          this.value = xValue;
          updateColor();
        }
      });
  
      this.path.click((event) => {
        var xValue = parseInt(event.pageX - this.path.offset().left);
        this.value = xValue;
        if (this.value < 0) {
          this.value = 0;
        } else if (this.value > 255) {
          this.value = 255;
        }
        this.element.css("left", this.value + "px");
        this.updateGetValue(this.value);
        updateColor();
      });
    }
  
    updateGetValue(value) {
      this.label.text(value+"");
      return value;
    }
  
    getValue() {
      return this.value;
    }
  
    getColor() {
      return this.color;
    }
}


//red slider
const redSlider = new Slider("red",$(".red-path"),$(".red-element"),$(".red-container"),$(".red-label"));

//green slider
const greenSlider = new Slider("green",$(".green-path"),$(".green-element"),$(".green-container"),$(".green-label"));

//blue slider
const blueSlider = new Slider("blue",$(".blue-path"),$(".blue-element"),$(".blue-container"),$(".blue-label"));



var inputField = document.querySelector("input");
$("button").click(() => {
    inputField.select();
    document.execCommand('copy');
    $("button").text("done");
    setTimeout(function () {
        $("button").text("copy");
    },4000);
});

//rgb(185, 143, 69) tested working

//opacity slider

class SliderOpacity {

  constructor(path,container,element) {
    this.value = 1;
    this.isDragging = false;
    this.isFirst = false;
    this.element = element;
    this.path = path;
    this.container = container;
    this.temp = 0;

    this.element.css("left", "150px");

    this.element.mousedown(() => {
        this.isDragging = true;
        console.log("test");
        this.isFirst = true;
    });

  
    this.path.mouseup(() => {
      this.isDragging = false;
      this.isFirst = false;
      this.temp = 0;
    });

    $(document).mouseup(() => {
      this.isDragging = false;
    })

    this.container.mouseup(() => {
      this.isDragging = false;
      this.isFirst = false;
      this.temp = 0;
    }); 

    this.container.mousemove((event) => {
        if(this.isDragging) {

          if(this.isFirst) {
            this.isFirst = false;
            this.temp = parseInt(event.pageX - element.offset().left);
          }

          var valueX = parseInt((event.pageX - this.path.offset().left) - this.temp);
          if(valueX < 0) {
            valueX  = 0;
          } else if(valueX > 150) {
            valueX = 150;
          }
          this.value = (valueX/150).toFixed(2);
          this.element.css("left", (valueX)+"px");
          updateColor();
        }
    }); 
  
  }
  
}  
  
  


  
const opacitySlider = new SliderOpacity($(".opacity-path"),$(".opacity-container"),$(".opacity-element"));


function updateColor() {
  var colorString = `rgba(${redSlider.value},${greenSlider.value},${blueSlider.value},${opacitySlider.value})`;
  $(".output").css("background", colorString);
  $("input").val($(".output").css("background-color"))
}

updateColor();