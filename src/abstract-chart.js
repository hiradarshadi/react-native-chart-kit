import React, { Component } from 'react'
import { Dimensions } from 'react-native';
import {
  LinearGradient,
  Line,
  Text,
  Defs,
  Stop
} from 'react-native-svg'

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

class AbstractChart extends Component {
  renderHorizontalLines = config => {
    const { count, width, height, paddingTop, paddingRight } = config
    return [...new Array(count)].map((_, i) => {
      return (
        <Line
          key={Math.random()}
          x1={paddingRight}
          y1={(height / 4 * i) + paddingTop}
          x2={width}
          y2={(height / 4 * i) + paddingTop}
          stroke={this.props.chartConfig.color(0.2)}
          strokeWidth={1}
          strokeOpacity={0.35}
        />
      )
    })
  }

  renderHorizontalLabels = config => {
    const { count, data, height, paddingTop, paddingRight, yLabelsOffset = 12 } = config
    return [...new Array(count)].map((_, i) => {
      return (
        <Text
          key={Math.random()}
          x={paddingRight - yLabelsOffset + 5}
          textAnchor="end"
          y={(height * 3 / 4) - ((height - paddingTop) / count * i) + yLabelsOffset}
          fontSize={10}
          fontFamily="Shabnam"
          fill='white'
        >{(((Math.max(...data) - Math.min(...data)) / (count - 1) * i) + Math.min(...data)).toFixed(2)}
        </Text>
      )
    })
  }

  renderVerticalLabels = config => {
    const { labels = [], width, height, paddingRight, paddingTop, horizontalOffset = 0 } = config
    const fontSize = 10
    return labels.map((label, i) => {
      return (
        <Text
          key={Math.random()}
          x={((width - paddingRight) / labels.length * (i)) + paddingRight + horizontalOffset}
          y={(height * 3 / 4) + paddingTop + (fontSize * 2)}
          fontSize={fontSize}
          fill='white'
          fontFamily="Shabnam"
          textAnchor="middle"
        >{label}
        </Text>
      )
    })
  }

  renderVerticalLines = config => {
    const { data, width, height, paddingTop, paddingRight } = config
    return [...new Array(data.length)].map((_, i) => {
      return (
        <Line
          key={Math.random()}
          x1={Math.floor((width - paddingRight) / data.length * (i) + paddingRight)}
          y1={0}
          x2={Math.floor((width - paddingRight) / data.length * (i) + paddingRight)}
          y2={height - (height / 4) + paddingTop}
          stroke={this.props.chartConfig.color(0.2)}
          strokeWidth={1}
        />
      )
    })
  }

  renderDefs = config => {
    const { width, height, backgroundGradientFrom, backgroundGradientTo } = config
    return (
      <Defs>
        <LinearGradient id="backgroundGradient" x1="0" y1={height} x2={width} y2={0}>
          <Stop offset="0" stopColor={backgroundGradientFrom}/>
          <Stop offset="1" stopColor={backgroundGradientTo}/>
        </LinearGradient>
        <LinearGradient id="fillShadowGradient" x1={0} y1={0} x2={0} y2={height}>
          <Stop offset="0" stopColor={this.props.chartConfig.color()} stopOpacity="0.1"/>
          <Stop offset="1" stopColor={this.props.chartConfig.color()} stopOpacity="0"/>
        </LinearGradient>
      </Defs>
    )
  }
}

export default AbstractChart
