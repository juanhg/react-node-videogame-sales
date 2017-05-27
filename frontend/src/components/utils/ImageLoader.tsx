import * as React from 'react';

var FileInput = require('react-file-input');

interface State {}
interface Props extends React.Props<ImageLoader> {
    placeholder ?: string,
    className?: string,
    fileInputClassName?: string,
    onImageLoad ?: (event: any) => any;
}

export default class ImageLoader extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    public render() {
        return (
            <div className={this.props.className}>
            <FileInput name="myImage"
                   accept=".png,.gif,.jpeg,.jpg"
                   placeholder={this.props.placeholder}
                   className={this.props.fileInputClassName}
                   onChange={this.props.onImageLoad.bind(this)}/>
            </div>
        )
    }
}

