import d3 from 'd3';
import source from './source.json';

window.onload = function() {

  d3.select('#app')
    .attr('width', 300)
    .attr('height', 300)
    .append('g')
      .selectAll('text')
      .data(source)
      .enter()
      .append('text')
        .text(d => d.title)

};
