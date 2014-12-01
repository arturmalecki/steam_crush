//Only difference to a Button constructor is the label parameter...
LabelButton = function(game, x, y, key, label, callback, callbackContext, overFrame, outFrame, downFrame, upFrame)
{
  Phaser.Button.call(this, game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame);
  //Style how you wish...
  this.style = {
    'font': '36px Arial',
    'fill': 'black'
  };   
  this.label = new Phaser.Text(game, 0, 0, "Label", this.style);
  this.addChild(this.label);
  this.setLabel(label);
};
LabelButton.prototype = Object.create(Phaser.Button.prototype);
LabelButton.prototype.constructor = LabelButton;

LabelButton.prototype.setLabel = function(label)
{
  this.label.setText(label);
  this.label.x = Math.floor((this.width - this.label.width)*0.5);
  this.label.y = Math.floor((this.height - this.label.height)*0.5);
};
