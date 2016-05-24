import d3 from 'd3';
//import source from './source.json';

let source = [
  {
    company: 'Moscow Exchange',
    position: 'Senior Developer',
    address: 'Moscow, Bolshoy Kislovsky st. 13',
    description: 'Currently working on development of rich web UI for the Exchange Information Fabric (prospective middle-cycle integration platform). UI provides means of visualisation and live monitoring of large amounts of data that is pushed from server at high frequency.'
  },
  {
    company: 'Moscow Exchange',
    position: 'Senior Developer',
    address: 'Moscow, Bolshoy Kislovsky st. 13',
    description: 'Currently working on development of rich web UI for the Exchange Information Fabric (prospective middle-cycle integration platform). UI provides means of visualisation and live monitoring of large amounts of data that is pushed from server at high frequency.'
  },
  {
    company: 'Moscow Exchange',
    position: 'Senior Developer',
    address: 'Moscow, Bolshoy Kislovsky st. 13',
    description: 'Currently working on development of rich web UI for the Exchange Information Fabric (prospective middle-cycle integration platform). UI provides means of visualisation and live monitoring of large amounts of data that is pushed from server at high frequency.'
  },
  {
    company: 'Moscow Exchange',
    position: 'Senior Developer',
    address: 'Moscow, Bolshoy Kislovsky st. 13',
    description: 'Currently working on development of rich web UI for the Exchange Information Fabric (prospective middle-cycle integration platform). UI provides means of visualisation and live monitoring of large amounts of data that is pushed from server at high frequency.'
  },
  {
    company: 'Moscow Exchange',
    position: 'Senior Developer',
    address: 'Moscow, Bolshoy Kislovsky st. 13',
    description: 'Currently working on development of rich web UI for the Exchange Information Fabric (prospective middle-cycle integration platform). UI provides means of visualisation and live monitoring of large amounts of data that is pushed from server at high frequency.'
  }
];

window.onload = function () {
  // @formatter:off

  //let sales = [
  //  { product: 'Hoodie',  count: 1 },
  //  { product: 'Jacket',  count: 6 },
  //  { product: 'Snuggie', count: 9 }
  //];
  //
  //let svg = d3.select('#app')
  //  .append('svg')
  //  .attr('width', 300)
  //  .attr('height', 300);
  //
  //let x = d3.scale.linear()
  //  .range([0, 300])
  //  .domain([0, 9]);
  //
  //let y = d3.scale.ordinal()
  //  .rangeRoundBands([0, 30])
  //  .domain(sales.map(function(d, i) {
  //    return d.product;
  //  }));
  //
  //
  //let rects = svg
  //  .selectAll('rect')
  //  .data(sales, function(d, i) {
  //    return d.product
  //  });
  //
  //rects.enter()
  //  .append('rect');
  //
  //rects
  //  .attr('x', x(0))
  //  .attr('y', function(d, i) {
  //    return y(d.product);
  //  })
  //  .attr('height', y.rangeBand())
  //  .attr('width', function(d, i) {
  //    return x(d.count);
  //  });

  let svg = d3.select('#app')
    .append('svg')
    .attr('width', 500)
    .attr('height', 500);

  //let paths = svg
  //  .selectAll('path')
  //  .data([1]);
  //
  //let x1 = 10,
  //    y1 = 10,
  //    x2 = 100,
  //    y2 = 100,
  //    slope = 50;
  //
  //paths.enter()
  //  .append('path')
  //  .attr('d', `M${x1} ${y1} C ${x1 + slope} ${y1}, ${x2 - slope} ${y2}, ${x2} ${y2}`)
  //  .attr('stroke', 'black')
  //  .attr('fill', 'transparent')


  let verticalPadding = 10,
      horizontalPadding = 10,
      verticalSpacing = 30;

  let text = svg
    .selectAll('text')
    .data(source);

  text.enter()
    .append('text')
    .attr('class', 'company')
    .text(d => d.company);

  let top = 100 + verticalPadding,
      left = 100;

  text.each(function(d) {
    let {width, height} = this.getBoundingClientRect();
    d._rect = {width, height, top};
    d3.select(this)
      .attr('x', left + horizontalPadding)
      .attr('y', top + verticalPadding);
    top += height + verticalSpacing + verticalPadding * 2;
  });

  let rect = svg
    .selectAll('rect')
    .data(source);

  rect.enter()
    .append('rect')
    .attr('x', left - horizontalPadding)
    .attr('y', d => d._rect.top - verticalPadding)
    .attr('width', d => d._rect.width + horizontalPadding * 2)
    .attr('height', d => d._rect.height + verticalPadding * 2)
    .attr('class', 'backing-rect');


  // @formatter:on
};
