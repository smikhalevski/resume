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
    description:
      `<tspan x="0" dy="${DESCRIPTION_FIRST_LINE_HEIGHT}">Currently working on development of rich web UI for the Exchange</tspan>` +
      `<tspan x="0" dy="${LINE_HEIGHT}">Information Fabric (prospective middle-cycle integration platform).</tspan>` +
      `<tspan x="0" dy="${LINE_HEIGHT}">UI provides means of visualisation and live monitoring of large amounts</tspan>` +
      `<tspan x="0" dy="${LINE_HEIGHT}">of data that is pushed from server at high frequency.</tspan>`
  },
  {
    institution: 'Sberbank CIB',
    position: 'Integration Solutions Developer',
    address: 'Moscow, Romanov st. 4',
    href: 'http://sberbank-cib.ru',
    description:
      `<tspan x="0" dy="${DESCRIPTION_FIRST_LINE_HEIGHT}">\u2460 Full-featured real-time monitoring system for ESB</tspan>` +
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
    description:
      `<tspan x="0" dy="${DESCRIPTION_FIRST_LINE_HEIGHT}">Geoinformatics Laboratory of Russian Academy of Sciences</tspan>` +
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
    description:
      `<tspan x="0" dy="${DESCRIPTION_FIRST_LINE_HEIGHT}">Faculty of Engineering Cybernetics / Dept. of System Analysis and Control</tspan>` +
      `<tspan x="0" dy="${LINE_HEIGHT}">Diploma on quality analysis and control in strongly connected systems</tspan>`
  },
  {
    institution: 'State Polytechnic University',
    position: 'Physics Bachelor',
    address: 'St. Petersburg, Politekhnicheskaya st. 29',
    href: 'http://spbstu.ru',
    description:
      `<tspan x="0" dy="${DESCRIPTION_FIRST_LINE_HEIGHT}">Faculty of Physics and Mechanics / Dept. of Experimental Physics</tspan>` +
      `<tspan x="0" dy="${LINE_HEIGHT}">Diploma on high-energy transport of electrons from alloyed</tspan>` +
      `<tspan x="0" dy="${LINE_HEIGHT}">superlattice to widen quantum well</tspan>`
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
    .attr('width', 700)
    .attr('height', 4000);


  const BEGIN_YEAR = 2003,
        NEXT_YEAR = new Date().getFullYear() + 1,
        YEAR_GAUGE_WIDTH = 40,
        YEAR_LABEL_WIDTH = 20,
        YEAR_AXIS_LENGTH = (NEXT_YEAR - BEGIN_YEAR) * (YEAR_GAUGE_WIDTH + YEAR_LABEL_WIDTH);

  // Year band scale with padding.
  function dateScale(date) {
    let year = date.getFullYear(),
        scale = d3.time.scale()
            .rangeRound([0, YEAR_GAUGE_WIDTH])
            .domain([new Date(year, 0), new Date(year + 1, 0)]);
    return (year - BEGIN_YEAR) * (YEAR_GAUGE_WIDTH + YEAR_LABEL_WIDTH) + scale(date);
  }

  let axis = svg.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(200, 100)`);

  let yearsRange = d3.range(NEXT_YEAR - BEGIN_YEAR - 2, 0, -1);

  let axisYears = axis.selectAll('g.axis__year')
      .data(yearsRange);

  let axisYear = axisYears.enter()
      .append('g')
      .attr('class', 'axis__year')
      .attr('transform', (d, i) => `translate(0, ${i * (YEAR_GAUGE_WIDTH + YEAR_LABEL_WIDTH)})`);
  
  axisYear.append('rect')
      .attr('class', 'axis__year__gauge')
      .attr('height', YEAR_GAUGE_WIDTH)
      .attr('width', 2);

  axisYear.append('text')
      .attr('class', 'axis__year__label')
      .attr('dominant-baseline', 'middle')
      .attr('text-anchor', (d, i) => {
        switch (i) {
          case 0: return 'end';
          case yearsRange.length: return 'begin';
          default: return 'middle';
        }
      })
      .attr('transform', (d, i) => {

        return `translate(0, ${YEAR_GAUGE_WIDTH + Math.round(YEAR_LABEL_WIDTH / 2)}) rotate(-90)`

      })
      .text(d => {
        let year = BEGIN_YEAR + d - 2000;
        if (year < 10) {
          return '0' + year
        } else {
          return year;
        }
      });

  // axis.append('text')
  //     .attr('class', 'axis__year__label')
  //     .attr('dominant-baseline', 'middle')
  //     .attr('text-anchor', 'end')
  //     .attr('transform', `translate(0, ${axis.node().getBoundingClientRect().height + 3}) rotate(-90)`)
  //     .text(BEGIN_YEAR);
  //
  // axis.append('text')
  //     .attr('class', 'axis__year__label')
  //     .attr('dominant-baseline', 'middle')
  //     .attr('text-anchor', 'begin')
  //     .attr('transform', `rotate(-90)`)
  //     .text(NEXT_YEAR - 1);






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



  // @formatter:on
};
