import React from 'react';
import Theme from './../themes/getStyle';

import VariableRow from './VariableRow';
import VariableMeta from './VariableMeta';
import ObjectName from './ObjectName'
import ObjectComponent from './DataTypes/Object'

//icons
import { CollapsedIcon, ExpandedIcon } from './ToggleIcons';

//single indent is 5px
const SINGLE_INDENT = 5;

export default class extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            expanded: {}
        }
    }

    toggleCollapsed = (i) => {
        this.state.expanded[i] = !this.state.expanded[i]

        this.setState(this.state);
    }

    getExpandedIcon(i) {
        const { theme, iconStyle } = this.props

        if (!!this.state.expanded[i]) {
            return <ExpandedIcon {...{theme, iconStyle}}/>
        } 

        return <CollapsedIcon {...{theme, iconStyle}} />
    }

    render() {
        let { 
            src, groupArraysAfterLength, depth, 
            name, theme, jsvRoot, parent_type, namespace,
            ...rest
        } = this.props

        let expanded_icon, object_padding_left = 0;

        const array_group_padding_left = this.props.indentWidth * SINGLE_INDENT

        if (!jsvRoot) {
            object_padding_left = this.props.indentWidth * SINGLE_INDENT;
        }

        const size = groupArraysAfterLength
        const groups = Math.ceil(src.length / size)
        console.log (this.props.namespace, name)
        namespace = this.props.namespace.concat(name);

        return (<VariableRow class='object-key-val'
                    {...Theme(theme, jsvRoot ? 'jsv-root' : 'objectKeyVal', {paddingLeft: object_padding_left})}
                    {...{namespace, name}}
                >
            <ObjectName {...this.props} />

            <span>
                <VariableMeta size={src.length} {...this.props} {...{namespace, name}}/>
            </span>
            {[...Array(groups)].map((_, i) => 
                <div key={i} class='object-key-val array-group' {...Theme(theme, 'objectKeyVal', {
                    marginLeft: 6,
                    paddingLeft: array_group_padding_left
                    })} >
                <span {...Theme(theme, 'brace-row')}>

                    <div class='icon-container' {...Theme(theme, 'icon-container')}
                         onClick={(e) => {this.toggleCollapsed(i)}}>
                        {this.getExpandedIcon(i)}
                    </div>
                    {!!this.state.expanded[i] ? 
                        <ObjectComponent key={name + i}
                            depth={0}
                            collapsed={false}
                            groupArraysAfterLength={size}
                            index_offset={i * size}
                            src={src.slice(i * size, i * size + size)}
                            namespace={namespace}
                            type="array"
                            parent_type="array_group"
                            theme={theme}
                            {...rest}
                        />
                    :   <span {...Theme(theme, 'brace')}  onClick={(e) => {this.toggleCollapsed(i)}} class='array-group-brace'>
                            [
                            <div {...Theme(theme, 'array-group-meta-data')} class='array-group-meta-data'>
                                <span class='object-size'
                                {...Theme(theme, 'object-size')}>
                                {i * size}
                                {' - '}
                                {i * size + size > src.length ? src.length : i * size + size}
                                </span>
                            </div>
                            ]
                        </span>
                    }
                    
                </span>
                </div>
            )}
            </VariableRow>
        );
    }

}