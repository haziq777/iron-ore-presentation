/* Shared map geometry for the Slide 1 route graphic (used by the HTML deck and the PPTX build). */
(function(root){
  function buildMapGeometry(d3,topojson,WORLD,W,H){
    const feats=topojson.feature(WORLD,WORLD.objects.countries).features.filter(f=>f.id!=='010');
    const proj=d3.geoMercator().fitExtent([[0,0],[W,H]],{type:'Feature',geometry:{type:'MultiPoint',coordinates:[[80,-36],[165,44]]}});
    const path=d3.geoPath(proj);
    const land=feats.map(f=>({id:f.id,name:(f.properties||{}).name,d:path(f)})).filter(l=>l.d);
    const P=(lon,lat)=>proj([lon,lat]);
    const routeLL=[[118.6,-20.3],[117.2,-13],[115.9,-8.9],[117.3,-3],[119.2,6],[119.6,15],[119.8,24],[121.5,30],[120.3,36.1]];
    const route=routeLL.map(p=>P(...p));
    const line=d3.line().curve(d3.curveCardinal.tension(0));
    return {land,route,routeD:line(route),origin:P(118.6,-20.3),dest:P(120.3,36.1)};
  }
  if(typeof module!=='undefined'&&module.exports)module.exports=buildMapGeometry;else root.buildMapGeometry=buildMapGeometry;
})(this);
