import React, { Component } from 'react';
import Context from 'rsg-components/Context';
import createStyleSheet from '../../styles/createStyleSheet';

export default styles => WrappedComponent => {
	const componentName = WrappedComponent.name.replace(/Renderer$/, '');
	return class extends Component {
		static displayName = `Styled(${componentName})`;
		static contextType = Context;
		constructor(props, context) {
			super(props, context);
			this.sheet = createStyleSheet(styles, context.config || {}, componentName);
			this.sheet.update(props).attach();
		}

		componentDidUpdate(nextProps) {
			this.sheet.update(nextProps);
		}

		render() {
			return <WrappedComponent {...this.props} classes={this.sheet.classes} />;
		}
	};
};
