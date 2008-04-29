/*

  OpenLayers.js -- OpenLayers Map Viewer Library

  Copyright 2005-2008 MetaCarta, Inc., released under the Clear BSD license.
  Please see http://svn.openlayers.org/trunk/openlayers/license.txt
  for the full text of the license.

  Includes compressed code under the following licenses:

  (For uncompressed versions of the code used please see the
  OpenLayers SVN repository: <http://openlayers.org/>)

*/

/* Contains portions of Prototype.js:
 *
 * Prototype JavaScript framework, version 1.4.0
 *  (c) 2005 Sam Stephenson <sam@conio.net>
 *
 *  Prototype is freely distributable under the terms of an MIT-style license.
 *  For details, see the Prototype web site: http://prototype.conio.net/
 *
 *--------------------------------------------------------------------------*/

/**  
*  
*  Contains portions of Rico <http://openrico.org/>
* 
*  Copyright 2005 Sabre Airline Solutions  
*  
*  Licensed under the Apache License, Version 2.0 (the "License"); you
*  may not use this file except in compliance with the License. You
*  may obtain a copy of the License at
*  
*         http://www.apache.org/licenses/LICENSE-2.0  
*  
*  Unless required by applicable law or agreed to in writing, software
*  distributed under the License is distributed on an "AS IS" BASIS,
*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
*  implied. See the License for the specific language governing
*  permissions and limitations under the License. 
*
**/

OpenLayers.Control.TypocosmyPanZoom=OpenLayers.Class(OpenLayers.Control,{slideFactor:50,buttons:null,position:null,initialize:function(options){this.position=new OpenLayers.Pixel(OpenLayers.Control.TypocosmyPanZoom.X,OpenLayers.Control.TypocosmyPanZoom.Y);OpenLayers.Control.prototype.initialize.apply(this,arguments);},destroy:function(){OpenLayers.Control.prototype.destroy.apply(this,arguments);while(this.buttons.length){var btn=this.buttons.shift();btn.map=null;OpenLayers.Event.stopObservingElement(btn);}
this.buttons=null;this.position=null;},draw:function(px){OpenLayers.Control.prototype.draw.apply(this,arguments);px=this.position;this.buttons=[];var sz=new OpenLayers.Size(18,18);var centered=new OpenLayers.Pixel(px.x+sz.w/2,px.y);this._addButton("panup","north-mini.png",centered,sz);px.y=centered.y+sz.h;this._addButton("panleft","west-mini.png",px,sz);this._addButton("panright","east-mini.png",px.add(sz.w,0),sz);this._addButton("pandown","south-mini.png",centered.add(0,sz.h*2),sz);this._addButton("zoomin","zoom-plus-mini.png",centered.add(0,sz.h*3+5),sz);this._addButton("zoomworld","zoom-world-mini.png",centered.add(0,sz.h*4+5),sz);this._addButton("zoomout","zoom-minus-mini.png",centered.add(0,sz.h*5+5),sz);return this.div;},_addButton:function(id,img,xy,sz){var imgLocation=OpenLayers.Util.getImagesLocation()+img;var btn=OpenLayers.Util.createAlphaImageDiv("OpenLayers_Control_PanZoom_"+id,xy,sz,imgLocation,"absolute");this.div.appendChild(btn);OpenLayers.Event.observe(btn,"mousedown",OpenLayers.Function.bindAsEventListener(this.buttonDown,btn));OpenLayers.Event.observe(btn,"dblclick",OpenLayers.Function.bindAsEventListener(this.doubleClick,btn));OpenLayers.Event.observe(btn,"click",OpenLayers.Function.bindAsEventListener(this.doubleClick,btn));btn.action=id;btn.map=this.map;btn.slideFactor=this.slideFactor;this.buttons.push(btn);return btn;},doubleClick:function(evt){OpenLayers.Event.stop(evt);return false;},buttonDown:function(evt){if(!OpenLayers.Event.isLeftClick(evt)){return;}
switch(this.action){case"panup":this.map.pan(0,-this.slideFactor);updateMarkers();break;case"pandown":this.map.pan(0,this.slideFactor);updateMarkers();break;case"panleft":this.map.pan(-this.slideFactor,0);updateMarkers();break;case"panright":this.map.pan(this.slideFactor,0);updateMarkers();break;case"zoomin":this.map.zoomIn();updateMarkers();break;case"zoomout":this.map.zoomOut();updateMarkers();break;case"zoomworld":this.map.zoomToMaxExtent();updateMarkers();break;}
OpenLayers.Event.stop(evt);},CLASS_NAME:"OpenLayers.Control.TypocosmyPanZoom"});OpenLayers.Control.TypocosmyPanZoom.X=4;OpenLayers.Control.TypocosmyPanZoom.Y=4;OpenLayers.Control.TypocosmyPanZoomBar=OpenLayers.Class(OpenLayers.Control.TypocosmyPanZoom,{zoomStopWidth:18,zoomStopHeight:11,slider:null,sliderEvents:null,zoomBarDiv:null,divEvents:null,zoomWorldIcon:false,initialize:function(){OpenLayers.Control.TypocosmyPanZoom.prototype.initialize.apply(this,arguments);},destroy:function(){this.div.removeChild(this.slider);this.slider=null;this.sliderEvents.destroy();this.sliderEvents=null;this.div.removeChild(this.zoombarDiv);this.zoomBarDiv=null;this.divEvents.destroy();this.divEvents=null;this.map.events.un({"zoomend":this.moveZoomBar,"changebaselayer":this.redraw,scope:this});OpenLayers.Control.TypocosmyPanZoom.prototype.destroy.apply(this,arguments);},setMap:function(map){OpenLayers.Control.TypocosmyPanZoom.prototype.setMap.apply(this,arguments);this.map.events.register("changebaselayer",this,this.redraw);},redraw:function(){if(this.div!=null){this.div.innerHTML="";}
this.draw();},draw:function(px){OpenLayers.Control.prototype.draw.apply(this,arguments);px=this.position.clone();this.buttons=[];var sz=new OpenLayers.Size(18,18);var centered=new OpenLayers.Pixel(px.x+sz.w/2,px.y);var wposition=sz.w;if(this.zoomWorldIcon){centered=new OpenLayers.Pixel(px.x+sz.w,px.y);}
this._addButton("panup","north-mini.png",centered,sz);px.y=centered.y+sz.h;this._addButton("panleft","west-mini.png",px,sz);if(this.zoomWorldIcon){this._addButton("zoomworld","zoom-world-mini.png",px.add(sz.w,0),sz);wposition*=2;}
this._addButton("panright","east-mini.png",px.add(wposition,0),sz);this._addButton("pandown","south-mini.png",centered.add(0,sz.h*2),sz);this._addButton("zoomin","zoom-plus-mini.png",centered.add(0,sz.h*3+5),sz);centered=this._addZoomBar(centered.add(0,sz.h*4+5));this._addButton("zoomout","zoom-minus-mini.png",centered,sz);return this.div;},_addZoomBar:function(centered){var imgLocation=OpenLayers.Util.getImagesLocation();var id="OpenLayers_Control_PanZoomBar_Slider"+this.map.id;var zoomsToEnd=this.map.getNumZoomLevels()-1-this.map.getZoom();var slider=OpenLayers.Util.createAlphaImageDiv(id,centered.add(-1,zoomsToEnd*this.zoomStopHeight),new OpenLayers.Size(20,9),imgLocation+"slider.png","absolute");this.slider=slider;this.sliderEvents=new OpenLayers.Events(this,slider,null,true);this.sliderEvents.on({"mousedown":this.zoomBarDown,"mousemove":this.zoomBarDrag,"mouseup":this.zoomBarUp,"dblclick":this.doubleClick,"click":this.doubleClick});var sz=new OpenLayers.Size();sz.h=this.zoomStopHeight*this.map.getNumZoomLevels();sz.w=this.zoomStopWidth;var div=null;if(OpenLayers.Util.alphaHack()){var id="OpenLayers_Control_PanZoomBar"+this.map.id;div=OpenLayers.Util.createAlphaImageDiv(id,centered,new OpenLayers.Size(sz.w,this.zoomStopHeight),imgLocation+"zoombar.png","absolute",null,"crop");div.style.height=sz.h;}else{div=OpenLayers.Util.createDiv('OpenLayers_Control_PanZoomBar_Zoombar'+this.map.id,centered,sz,imgLocation+"zoombar.png");}
this.zoombarDiv=div;this.divEvents=new OpenLayers.Events(this,div,null,true);this.divEvents.on({"mousedown":this.divClick,"mousemove":this.passEventToSlider,"dblclick":this.doubleClick,"click":this.doubleClick});this.div.appendChild(div);this.startTop=parseInt(div.style.top);this.div.appendChild(slider);this.map.events.register("zoomend",this,this.moveZoomBar);centered=centered.add(0,this.zoomStopHeight*this.map.getNumZoomLevels());return centered;},passEventToSlider:function(evt){this.sliderEvents.handleBrowserEvent(evt);},divClick:function(evt){if(!OpenLayers.Event.isLeftClick(evt)){return;}
var y=evt.xy.y;var top=OpenLayers.Util.pagePosition(evt.object)[1];var levels=(y-top)/this.zoomStopHeight;if(!this.map.fractionalZoom){levels=Math.floor(levels);}
var zoom=(this.map.getNumZoomLevels()-1)-levels;zoom=Math.min(Math.max(zoom,0),this.map.getNumZoomLevels()-1);this.map.zoomTo(zoom);OpenLayers.Event.stop(evt);updateMarkers();},zoomBarDown:function(evt){if(!OpenLayers.Event.isLeftClick(evt)){return;}
this.map.events.on({"mousemove":this.passEventToSlider,"mouseup":this.passEventToSlider,scope:this});this.mouseDragStart=evt.xy.clone();this.zoomStart=evt.xy.clone();this.div.style.cursor="move";this.zoombarDiv.offsets=null;OpenLayers.Event.stop(evt);},zoomBarDrag:function(evt){if(this.mouseDragStart!=null){var deltaY=this.mouseDragStart.y-evt.xy.y;var offsets=OpenLayers.Util.pagePosition(this.zoombarDiv);if((evt.clientY-offsets[1])>0&&(evt.clientY-offsets[1])<parseInt(this.zoombarDiv.style.height)-2){var newTop=parseInt(this.slider.style.top)-deltaY;this.slider.style.top=newTop+"px";}
this.mouseDragStart=evt.xy.clone();OpenLayers.Event.stop(evt);}},zoomBarUp:function(evt){if(!OpenLayers.Event.isLeftClick(evt)){return;}
if(this.zoomStart){this.div.style.cursor="";this.map.events.un({"mouseup":this.passEventToSlider,"mousemove":this.passEventToSlider,scope:this});var deltaY=this.zoomStart.y-evt.xy.y;var zoomLevel=this.map.zoom;if(this.map.fractionalZoom){zoomLevel+=deltaY/this.zoomStopHeight;zoomLevel=Math.min(Math.max(zoomLevel,0),this.map.getNumZoomLevels()-1);}else{zoomLevel+=Math.round(deltaY/this.zoomStopHeight);}
this.map.zoomTo(zoomLevel);this.moveZoomBar();this.mouseDragStart=null;OpenLayers.Event.stop(evt);updateMarkers();}},moveZoomBar:function(){var newTop=((this.map.getNumZoomLevels()-1)-this.map.getZoom())*this.zoomStopHeight+this.startTop+1;this.slider.style.top=newTop+"px";},CLASS_NAME:"OpenLayers.Control.TypocosmyPanZoomBar"});OpenLayers.Control.TypocosmyDragPan=OpenLayers.Class(OpenLayers.Control,{type:OpenLayers.Control.TYPE_TOOL,panned:false,draw:function(){this.handler=new OpenLayers.Handler.Drag(this,{"move":this.panMap,"done":this.panMapDone});},panMap:function(xy){this.panned=true;this.map.pan(this.handler.last.x-xy.x,this.handler.last.y-xy.y,{dragging:this.handler.dragging,animate:false});},panMapDone:function(xy){if(this.panned){this.panMap(xy);this.panned=false;updateMarkers();}},CLASS_NAME:"OpenLayers.Control.TypocosmyDragPan"});OpenLayers.Control.TypocosmyZoomBox=OpenLayers.Class(OpenLayers.Control,{type:OpenLayers.Control.TYPE_TOOL,out:false,draw:function(){this.handler=new OpenLayers.Handler.Box(this,{done:this.zoomBox},{keyMask:this.keyMask});},zoomBox:function(position){if(position instanceof OpenLayers.Bounds){if(!this.out){var minXY=this.map.getLonLatFromPixel(new OpenLayers.Pixel(position.left,position.bottom));var maxXY=this.map.getLonLatFromPixel(new OpenLayers.Pixel(position.right,position.top));var bounds=new OpenLayers.Bounds(minXY.lon,minXY.lat,maxXY.lon,maxXY.lat);}else{var pixWidth=Math.abs(position.right-position.left);var pixHeight=Math.abs(position.top-position.bottom);var zoomFactor=Math.min((this.map.size.h/pixHeight),(this.map.size.w/pixWidth));var extent=this.map.getExtent();var center=this.map.getLonLatFromPixel(position.getCenterPixel());var xmin=center.lon-(extent.getWidth()/2)*zoomFactor;var xmax=center.lon+(extent.getWidth()/2)*zoomFactor;var ymin=center.lat-(extent.getHeight()/2)*zoomFactor;var ymax=center.lat+(extent.getHeight()/2)*zoomFactor;var bounds=new OpenLayers.Bounds(xmin,ymin,xmax,ymax);}
this.map.zoomToExtent(bounds);updateMarkers();}else{if(!this.out){this.map.setCenter(this.map.getLonLatFromPixel(position),this.map.getZoom()+1);updateMarkers();}else{this.map.setCenter(this.map.getLonLatFromPixel(position),this.map.getZoom()-1);updateMarkers();}}},CLASS_NAME:"OpenLayers.Control.TypocosmyZoomBox"});OpenLayers.Control.TypocosmyNavigation=OpenLayers.Class(OpenLayers.Control,{dragPan:null,zoomBox:null,zoomWheelEnabled:true,initialize:function(options){this.handlers={};OpenLayers.Control.prototype.initialize.apply(this,arguments);},destroy:function(){this.deactivate();if(this.dragPan){this.dragPan.destroy();}
this.dragPan=null;if(this.zoomBox){this.zoomBox.destroy();}
this.zoomBox=null;OpenLayers.Control.prototype.destroy.apply(this,arguments);},activate:function(){this.dragPan.activate();if(this.zoomWheelEnabled){this.handlers.wheel.activate();}
this.handlers.click.activate();this.zoomBox.activate();return OpenLayers.Control.prototype.activate.apply(this,arguments);},deactivate:function(){this.zoomBox.deactivate();this.dragPan.deactivate();this.handlers.click.deactivate();this.handlers.wheel.deactivate();return OpenLayers.Control.prototype.deactivate.apply(this,arguments);},draw:function(){this.handlers.click=new OpenLayers.Handler.Click(this,{'dblclick':this.defaultDblClick},{'double':true,'stopDouble':true});this.dragPan=new OpenLayers.Control.TypocosmyDragPan({map:this.map});this.zoomBox=new OpenLayers.Control.TypocosmyZoomBox({map:this.map,keyMask:OpenLayers.Handler.MOD_SHIFT});this.dragPan.draw();this.zoomBox.draw();this.handlers.wheel=new OpenLayers.Handler.MouseWheel(this,{"up":this.wheelUp,"down":this.wheelDown});this.activate();},defaultDblClick:function(evt){var newCenter=this.map.getLonLatFromViewPortPx(evt.xy);this.map.setCenter(newCenter,this.map.zoom+1);updateMarkers();},wheelChange:function(evt,deltaZ){var newZoom=this.map.getZoom()+deltaZ;if(!this.map.isValidZoomLevel(newZoom)){return;}
var size=this.map.getSize();var deltaX=size.w/2-evt.xy.x;var deltaY=evt.xy.y-size.h/2;var newRes=this.map.baseLayer.getResolutionForZoom(newZoom);var zoomPoint=this.map.getLonLatFromPixel(evt.xy);var newCenter=new OpenLayers.LonLat(zoomPoint.lon+deltaX*newRes,zoomPoint.lat+deltaY*newRes);this.map.setCenter(newCenter,newZoom);updateMarkers();},wheelUp:function(evt){this.wheelChange(evt,1);},wheelDown:function(evt){this.wheelChange(evt,-1);},disableZoomWheel:function(){this.zoomWheelEnabled=false;this.handlers.wheel.deactivate();},enableZoomWheel:function(){this.zoomWheelEnabled=true;if(this.active){this.handlers.wheel.activate();}},CLASS_NAME:"OpenLayers.Control.TypocosmyNavigation"});