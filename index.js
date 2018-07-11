import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './style.css'
class Password extends Component{
  constructor(props){
    super(props)
    this.state = {
      value: '',
      curIndex: 0
    }
  }
  onInputChange(e) {
    this.setState({
      value: e.target.value
    })
  }
  onInputKeyUp(e) {
    var {size} = this.props
    var _value = e.target.value
    if (!(_value.length <= size)) {
      _value = _value.substring(0, size)
    }
    this.setState({
      value: _value
    })
    var _curIndex = -1
    if (_value.length <= (size - 1)){
      _curIndex = _value.length
    }
    this.setState({
      curIndex: _curIndex
    })
    this.refs['inputCore'].value = _value
    this.props.onChange(_value)
  }
  onClickWrap() {
    this.refs['inputCore'].focus()
  }
  render() {
    const {onInputChange, onInputKeyUp, onClickWrap, type} = this
    const {size, pattern, styles} = this.props
    const {value, curIndex} = this.state
    let inputItems = []
    let _value = JSON.parse(JSON.stringify(value)).split('')
    let wrapStyle = styles.wrapStyle || {
      width: `calc( (${55 * size}px) + ${size + 1}px)`
    }
    var dotActiveStyle = styles.dotActiveStyle || {}

    for(var i = 0; i < size; i++) {
      inputItems.push(
        (
          <li key={i} style={dotActiveStyle} className={`show-dot ` + (curIndex === i ? 'active ' : '') + ''}>
            {_value[i] && <span className='dot-core'/>}
          </li>
        )
      )
    }

    return (
        <ul className={'pwd-list'} style={wrapStyle} onClick={onClickWrap.bind(this)}>
          {inputItems}
          <li className='input-wrap'>
            <input className="input-core" 
                ref='inputCore'
                autoFocus='autoFocus'
                style={styles.input}
                maxLength={size}
                pattern={pattern}
                type={type}
                placeholder=''
                onKeyUp={onInputKeyUp.bind(this)} 
                onChange={onInputChange.bind(this)}/>
          </li>
        </ul>
    )
  }
}

Password.propTypes = {
  size: PropTypes.number,
  type: PropTypes.string,
  onChange: PropTypes.func,
  styles: PropTypes.object,
  reset: PropTypes.func,
  pattern: PropTypes.string
}

Password.defaultProps = {
  size: 6,
  type: 'number',
  onChange: ()=>{},
  reset: () => {
    this.refs['inputCore'].value = null
  },
  styles: {
    wrap: {},
    input: {},
    dotActiveStyle: {}
  }
}

export default Password
