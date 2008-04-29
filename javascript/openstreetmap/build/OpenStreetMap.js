OpenLayers.Util.OSM={};OpenLayers.Util.OSM.MISSING_TILE_URL="http://openstreetmap.org/openlayers/img/404.png";OpenLayers.Util.OSM.originalOnImageLoadError=OpenLayers.Util.onImageLoadError;OpenLayers.Util.onImageLoadError=function(){if(this.src.match(/^http:\/\/[abc]\.[a-z]+\.openstreetmap\.org\//)){this.src=OpenLayers.Util.OSM.MISSING_TILE_URL;}else if(this.src.match(/^http:\/\/[def]\.tah\.openstreetmap\.org\//)){}else{OpenLayers.Util.OSM.originalOnImageLoadError;}};OpenLayers.Layer.OSM=OpenLayers.Class(OpenLayers.Layer.TMS,{initialize:function(name,url,options){options=OpenLayers.Util.extend({attribution:"Data by <a href='http://openstreetmap.org/'>OpenStreetMap</a>",maxExtent:new OpenLayers.Bounds(-20037508,-20037508,20037508,20037508),maxResolution:156543,units:"m",projection:"EPSG:900913",transitionEffect:"resize"},options);var newArguments=[name,url,options];OpenLayers.Layer.TMS.prototype.initialize.apply(this,newArguments);},getURL:function(bounds){var res=this.map.getResolution();var x=Math.round((bounds.left-this.maxExtent.left)/(res*this.tileSize.w));var y=Math.round((this.maxExtent.top-bounds.top)/(res*this.tileSize.h));var z=this.map.getZoom();var limit=Math.pow(2,z);if(y<0||y>=limit)
{return OpenLayers.Util.OSM.MISSING_TILE_URL;}
else
{x=((x%limit)+limit)%limit;var url=this.url;var path=z+"/"+x+"/"+y+".png";if(url instanceof Array)
{url=this.selectUrl(path,url);}
return url+path;}},CLASS_NAME:"OpenLayers.Layer.OSM"});OpenLayers.Layer.OSM.Mapnik=OpenLayers.Class(OpenLayers.Layer.OSM,{initialize:function(name,options){var url=["http://a.tile.openstreetmap.org/","http://b.tile.openstreetmap.org/","http://c.tile.openstreetmap.org/"];options=OpenLayers.Util.extend({numZoomLevels:19},options);var newArguments=[name,url,options];OpenLayers.Layer.OSM.prototype.initialize.apply(this,newArguments);},CLASS_NAME:"OpenLayers.Layer.OSM.Mapnik"});OpenLayers.Layer.OSM.Osmarender=OpenLayers.Class(OpenLayers.Layer.OSM,{initialize:function(name,options){var url=["http://a.tah.openstreetmap.org/Tiles/tile.php/","http://b.tah.openstreetmap.org/Tiles/tile.php/","http://c.tah.openstreetmap.org/Tiles/tile.php/"];options=OpenLayers.Util.extend({numZoomLevels:18},options);var newArguments=[name,url,options];OpenLayers.Layer.OSM.prototype.initialize.apply(this,newArguments);},CLASS_NAME:"OpenLayers.Layer.OSM.Osmarender"});OpenLayers.Layer.OSM.Maplint=OpenLayers.Class(OpenLayers.Layer.OSM,{initialize:function(name,options){var url=["http://d.tah.openstreetmap.org/Tiles/maplint.php/","http://e.tah.openstreetmap.org/Tiles/maplint.php/","http://f.tah.openstreetmap.org/Tiles/maplint.php/"];options=OpenLayers.Util.extend({numZoomLevels:18,isBaseLayer:false,visibility:false},options);var newArguments=[name,url,options];OpenLayers.Layer.OSM.prototype.initialize.apply(this,newArguments);},CLASS_NAME:"OpenLayers.Layer.OSM.Maplint"});