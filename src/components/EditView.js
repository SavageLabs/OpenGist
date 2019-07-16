import React, { Component } from 'react'
import View from './View';

export default class EditView extends Component {
    render() {
        return (
            <View {...this.props} />
        )
    }
}
