
var result;

fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
  .then(res => res.json())
  .then(data => result = data.data)
  .then(() => {
      const years = result.map(data => data[0])
      console.log(years)

    const height = 540;
    const width = 960;
    const padding = 40;
    const barWidth = width / result.length;


    
    const tooltip = d3.select(".container")
        .append("div")
        .style("position", "absolute")
        .style("z-index", "10")
        .style('background-color', 'yellow')
        .style("visibility", "hidden")
        .attr('id', 'tooltip')
        .style('opacity', 0.7)
    
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(result, (d) => d[1])])
        .range([0, height])

    const yScaleAxis = d3.scaleLinear()
        .domain([0, d3.max(result, (d) => d[1])])
        .range([height, 0])

    const yAxis = d3.axisLeft(yScaleAxis)

    var xMax = new Date(d3.max(years)); 
    xMax.setMonth(xMax.getMonth() + 3);

    const xScale = d3.scaleTime()
        .domain([new Date(d3.min(years)), xMax])
        .range([0, width])

    const xAxis = d3.axisBottom(xScale);


    const svg = d3.select('.container')
                .append('svg')
                .attr('height', height + 60)
                .attr('width', width + 120)
                .attr('class', 'title')

    svg.append('g')
        .attr('transform', `translate(40, 0)`)
        .attr('id', 'y-axis')
        .call(yAxis)

    svg.append('g')
        .attr('transform', `translate(${padding-1}, ${height-1})`)
        .attr('id', 'x-axis')
        .call(xAxis)

    svg.append('span')
        .text('Gross Domestic Product')
        .style('transform' , 'rotate(-90)')
        .style('transform','translateX(-100px)')

    svg.selectAll('rect')
        .data(result)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('data-gdp', (d, i) => d[1])
        .attr('data-date', (d, i) => d[0])
        .attr('y', (d, i) =>  height - yScale(d[1] + padding))
        .attr('x', (d, i) => i  * (width/ result.length) + padding )
        .attr('width' , barWidth)
        .attr('height', (d) => yScale(d[1]))
        .on("mouseover", function(d){return tooltip.style("visibility", "visible").attr('data-date', d[0])})
        .on("mousemove", function(d){return tooltip.style("left", (d3.event.pageX + 10) + "px")
        .style("top", (d3.event.pageY - 28) + "px").html(`<span>$ ${d[1]} Billion</span><br><span>${d[0]}</span>`).attr('data-date', d[0])})
        .on("mouseout", function(d){return tooltip.style("visibility", "hidden").attr('data-date', d[0])});

  })

 

  




