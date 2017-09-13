import React, {PropTypes} from 'react';
import _ from 'lodash';
require('./TreeView.css');

const TreeView = React.createClass({

    propTypes: {
        defaultCollapsed: PropTypes.bool,
        className: PropTypes.string,
        itemClassName: PropTypes.string,
    },

    getInitialState() {
        return {
            collapsed: this.props.defaultCollapsed
        };
    },

    handleClick(...args) {
        this.setState({collapsed: !this.state.collapsed});
        if (this.props.onClick) {
            this.props.onClick(...args);
        }
    },

    render() {
        const {
            collapsed = this.state.collapsed,
            className = '',
            itemClassName = '',
            node,
            ...rest,
        } = this.props;

        let arrowClassName = 'treeView__arrow';
        let containerClassName = 'treeView__children';

        if (collapsed) {
            arrowClassName += ' tree-view_arrow-collapsed';
            containerClassName += ' tree-view_children-collapsed';
        }

        const arrow =
            (<div
                {...rest}
                className={arrowClassName}
                onClick={this.handleClick}/>);
        let content = (<div></div>);

        if (_.isArray(node) && node.length > 0) {
            content = node.map((item, index) => {
                return (
                    <TreeView
                        key={'tree_' + index}
                        collapsed={this.state.collapsed}
                        className={className}
                        itemClassName={itemClassName}
                        node={item}
                    >
                    </TreeView>
                );
            });
        } else if (_.isObject(node)) {
            let keys = _.keys(node);
            content =

                keys.map((key, index) => {
                    let children = node[key];
                    return (
                        <div key={'tree_' + index} className={'treeView__list'}>
                            {arrow} {key}
                            <TreeView
                                collapsed={this.state.collapsed}
                                className={className}
                                itemClassName={itemClassName}
                                node={children}
                            >
                            </TreeView>
                        </div>
                    );
                });
        } else {
            return (
                <div className={'treeView__item ' + itemClassName}>
                    {node}
                </div>
            );
        }

        return (
            <div className={'treeView ' + className}>
                {content}
            </div>
        );

        // return (
        //     <div className={'tree-view ' + className}>
        //         <div className={'tree-view_item ' + itemClassName}>
        //             {arrow}
        //             {nodeLabel}
        //         </div>
        //         <div className={containerClassName}>
        //             {collapsed ? null : children}
        //         </div>
        //     </div>
        // );
    }
});

export default TreeView;