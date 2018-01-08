import React from "react";
import JsonObject from './DataTypes/Object';
import ArrayGroup from './ArrayGroup';

export default class extends React.Component {
    render = () => {
        const {props} = this;
        let ObjectComponent = JsonObject

        if (props.groupArraysAfterLength && props.src.length > props.groupArraysAfterLength) {
            ObjectComponent = ArrayGroup
        }

        return (
            <div class="pretty-json-container object-container" >
                <div class="object-content">
                    <ObjectComponent
                    namespace={[]}
                    depth={0}
                    jsvRoot={true}
                    {...props} />
                </div>
            </div>
        );
    }
}