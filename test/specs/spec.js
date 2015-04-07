/*jshint expr:true*/
mocha.setup('bdd');

jQuery(function($){
describe("jquery.passthrough", function(){
  chai.should();
  beforeEach(function () {
    $('body').append(
      '<div id="temp">' +
      '<div id="back" style="width:400px;height:400px;background:green" />' +
      '<div id="front" style="position:absolute;top:100px;left:100px;width:400px;height:400px;background:black" />' +
      '</div>'
    );
  });
  afterEach(function () {
    $('#temp').remove();
  });

  it('Accepts a normal click', function () {
    var back = $.Deferred();
    var front = $.Deferred();
    $('#back').click(back.resolve);
    $('#front').click(front.resolve);
    var e = new jQuery.Event("click");
    e.pageX = 10;
    e.pageY = 10;
    $("#back").trigger(e);
    $("#front").trigger(e);
    return $.when(back, front);
  });

  it('Doesn\'t accept a non-passed click', function () {
    var def = $.Deferred();
    $('#back').click(def.reject);
    $('#front').click();
    setTimeout(def.resolve, 10);
    return def;
  });

  it('Front passes a click', function () {
    var def = $.Deferred();
    $('#back').click(def.resolve);
    $('#front').passThrough('#back', true);
    var e = new jQuery.Event("click");
    e.pageX = 50;
    e.pageY = 50;
    $("#front").trigger(e);
    return def;
  });

  it('Front doesn\'t pass a click from outside field', function () {
    var def = $.Deferred();
    $('#back').click(def.reject);
    $('#front').passThrough('#back', true);
    var e = new jQuery.Event("click");
    e.pageX = 450;
    e.pageY = 450;
    $("#front").trigger(e);
    setTimeout(def.resolve, 10);
    return def;
  });


});
});