import d3 from 'd3';
//import source from './source.json';


const PERIOD_HORIZONTAL_PADDING = 20,
  PERIOD_VERTICAL_PADDING = 20,
  PERIOD_VERTICAL_SPACING = 10,
  DESCRIPTION_FIRST_LINE_HEIGHT = '4ex',
  PARAGRAPH_HEIGHT = '3ex',
  LINE_HEIGHT = '2.5ex';

let source = [
  {
    institution: 'Moscow Exchange',
    position: 'Senior Developer',
    address: 'Moscow, Bolshoy Kislovsky st. 13',
    href: 'http://moex.com',
    description: `<tspan x="0" dy="${DESCRIPTION_FIRST_LINE_HEIGHT}">Currently working on development of rich web UI for the Exchange</tspan>` +
    `<tspan x="0" dy="${LINE_HEIGHT}">Information Fabric (prospective middle-cycle integration platform).</tspan>` +
    `<tspan x="0" dy="${LINE_HEIGHT}">UI provides means of visualisation and live monitoring of large amounts</tspan>` +
    `<tspan x="0" dy="${LINE_HEIGHT}">of data that is pushed from server at high frequency.</tspan>`
  },
  {
    institution: 'Sberbank CIB',
    position: 'Integration Solutions Developer',
    address: 'Moscow, Romanov st. 4',
    href: 'http://sberbank-cib.ru',
    description: `<tspan x="0" dy="${DESCRIPTION_FIRST_LINE_HEIGHT}">\u2460 Full-featured real-time monitoring system for ESB</tspan>` +
    `<tspan x="0" dy="${PARAGRAPH_HEIGHT}">\u2461 SOA environment for low latency FIX-based intercommunication</tspan>` +
    `<tspan x="1.2em" dy="${LINE_HEIGHT}">between front office and electronic trading platforms</tspan>` +
    `<tspan x="0" dy="${PARAGRAPH_HEIGHT}">\u2462 Desktop client for e-FX</tspan>`
  },
  {
    institution: 'Troika Dialog',
    position: 'Testing Expert',
    address: 'Moscow, Romanov st. 4',
    href: 'http://troika.ru'
  },
  {
    institution: 'Geophysical Centre of RAS',
    position: 'Ph.D. Student',
    address: 'Moscow, Molodezhnaya st. 3',
    href: 'http://gcras.ru',
    description: `<tspan x="0" dy="${DESCRIPTION_FIRST_LINE_HEIGHT}">Geoinformatics Laboratory of Russian Academy of Sciences</tspan>` +
    `<tspan x="0" dy="${LINE_HEIGHT}">Fuzzy logic analysis of multidimensional time series</tspan>`
  },
  {
    institution: 'Sun Microsystems',
    position: 'QA Engineer',
    address: 'St. Petersburg, Rentgena st. 5a',
    href: 'http://exigenservices.ru'
  },
  {
    institution: 'Astra Software',
    position: 'Test Team Lead',
    address: 'St. Petersburg, Bolshaya Monetnaya st. 16'
  },
  {
    institution: 'Enkata Technologies',
    position: 'Test Engineer',
    address: 'St. Petersburg, Efimova Str. 4a, Suite 160',
    href: 'http://enkata.com'
  },
  {
    institution: 'State Polytechnic University',
    position: 'Master of System Analysis',
    address: 'St. Petersburg, Politekhnicheskaya st. 29',
    href: 'http://spbstu.ru',
    description: `<tspan x="0" dy="${DESCRIPTION_FIRST_LINE_HEIGHT}">Faculty of Engineering Cybernetics / Dept. of System Analysis and Control</tspan>` +
    `<tspan x="0" dy="${LINE_HEIGHT}">Diploma on quality analysis and control in strongly connected systems</tspan>`
  },
  {
    institution: 'State Polytechnic University',
    position: 'Physics Bachelor',
    address: 'St. Petersburg, Politekhnicheskaya st. 29',
    href: 'http://spbstu.ru',
    description: `<tspan x="0" dy="${DESCRIPTION_FIRST_LINE_HEIGHT}">Faculty of Physics and Mechanics / Dept. of Experimental Physics</tspan>` +
    `<tspan x="0" dy="${LINE_HEIGHT}">Diploma on high-energy transport of electrons from alloyed</tspan>` +
    `<tspan x="0" dy="${LINE_HEIGHT}">superlattice to widen quantum well</tspan>`
  }
];

window.onload = () => {

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
    .attr('width', 7000)
    .attr('height', 4000);


  let BEGIN_YEAR = 2003,
      CURRENT_YEAR = 2016;

  // Year band scale with padding.
  //function dateScale(date) {
  //  let year = date.getFullYear(),
  //    scale = d3.time.scale()
  //      .rangeRound([0, axisLabelGap])
  //      .domain([new Date(year, 0), new Date(year + 1, 0)]);
  //  return (year - BEGIN_YEAR) * (axisLabelGap + axisLabelHeight) + scale(date);
  //}

  let zero = d3.format('02d');

  let axis = svg.append('g')
    .attr('class', 'axis')
    .attr('transform', `translate(300, 900) rotate(-90)`);

  let text = axis.append('text');

  text.selectAll('tspan')
    .data(d3.range(BEGIN_YEAR, CURRENT_YEAR + 1))
    .enter()
    .append('tspan')
    .attr('dx', 40)
    .text(year => {
      if (year > BEGIN_YEAR && year < CURRENT_YEAR) {
        return zero(year - 2000);
      }
      return year;
    });

  let {height: width} = text.node().getBoundingClientRect();
  let w0 = text.node().children[0].getComputedTextLength(),
      w1 = text.node().children[1].getComputedTextLength();

  axis.append('path')
    .attr('class', 'axis__line')
    .attr('d', `M${40 + w0},0 L${40 + width - w0},0`)
    .attr('stroke-dasharray', `40,${w1}`);

  axis.append('path')
    .attr('class', 'axis__line')
    .attr('d', `M0,0 L${40},0 L${40},3 L${40 + 7},0 L${40},-3 L${40},0`)
    .attr('transform', `translate(${40 + width},0)`);






  /*let periods = svg
   .selectAll('g.period')
   .data(source);

   let period = periods.enter()
   .append('g')
   .attr('class', 'period')
   .each(d => d.rects = {});

   let title = period.append('text')
   .attr('transform', `translate(${PERIOD_HORIZONTAL_PADDING}, ${PERIOD_VERTICAL_PADDING})`);

   title.append('tspan')
   .attr('class', 'period__institution')
   .html(d => d.institution);

   title.append('tspan')
   .attr('dx', '.3em')
   .attr('class', 'period__position')
   .html(d => d.position);

   title.append('tspan')
   .attr('x', 0)
   .attr('dy', LINE_HEIGHT)
   .attr('class', 'period__address')
   .html(d => {
   if (d.href) {
   return d.address + ' \u2022 ';
   } else {
   return d.address;
   }
   });

   title.append('tspan')
   .attr('class', 'period__ref')
   .html(d => {
   if (d.href) {
   let a = document.createElement('a');
   a.href = d.href;
   return a.hostname;
   }
   });

   title.append('tspan')
   .attr('x', 0)
   .attr('dy', DESCRIPTION_FIRST_LINE_HEIGHT)
   .attr('class', 'period__description')
   .html(d => d.description);

   title.each(function(d) {
   d.rects.title = this.getBoundingClientRect();
   });

   period.insert('rect', ':first-child')
   .attr('width', d => d.rects.title.width + PERIOD_HORIZONTAL_PADDING * 2)
   .attr('height', d => d.rects.title.height + PERIOD_VERTICAL_PADDING * 2)
   .attr('class', 'period__background');

   let top = 0;

   periods.each(function(d) {
   this.setAttribute('transform', `translate(0, ${top})`);
   top += d.rects.title.height + PERIOD_VERTICAL_SPACING + PERIOD_VERTICAL_PADDING * 2;
   });

   svg.attr('height', top);*/


};
