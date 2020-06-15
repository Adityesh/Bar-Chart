const height = 540;
const width = 960;
const barWidth = width / 275;

const data = '';

(async () => {

    const response = await fetch('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json')
    const result = (await response.json()).data;
    const from = await response.json["from_date"];
    const to = await response.json["to_date"];


    const years =  result.map(data => {
        return data[0];
    })

    const priceData = result.map(data => {
        return data[1];
    })

    const yScale = d3.scaleLinear()
                    .domain([0, d3.max(priceData)])
                    .range([height, 0])

    const xScale = d3.scaleTime()
                    .domain([new Date(from), new Date(to)])
                    .range([0, width])
    
    const scaledHeights = priceData.map(price => {
        return yScale(price)
    })

    const scaledYears = years.map(year => {
        return yScale(year)
    })

    const svg = d3.select('.container')
                .append('svg')
                .attr('height', height)
                .attr('width', width)

    svg.selectAll('rect')
        .data(priceData)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (d, i) => xScale(years[i]))
        .attr('y', (d) => height - d)
        .attr('width', barWidth)
        .attr('height' , (d) => yScale(d))


})();