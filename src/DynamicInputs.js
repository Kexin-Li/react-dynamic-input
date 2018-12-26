import React from 'react';
import PropTypes from 'prop-types';

// 不支持于 choices 那样有 true 和 false 的数据结构，目前仅支持字符串。
class DynamicInputs extends React.Component {
  constructor(props) {
    super(props);

    // [array] [{cn: 'cn1', en: 'en1'}, {cn: 'cn2', en: 'en2'}]
    this.items = props.items;
    // [object] {cn: '中文例句', en: '英文例句'}
    this.keyNames = props.keyNames;
    // {object} {cn: '', en: ''}
    this.initialValue = props.initialValue;

    this.state = {
      items: this.items,
    };
  }

  handleItemChange = (index, name) => e => {
    const newItems = this.state.items.map((item, sidx) => {
      if (index !== sidx) return item;
      return { ...item, [name]: e.target.value };
    });
    this.setState({ items: newItems }, () => console.log(this.state.items));
  };

  handleRemoveItem = index => {
    this.setState({
      items: this.state.items.filter((choice, sidx) => index !== sidx),
    });
  };

  handleAddItem = () => {
    this.setState({
      items: this.state.items.concat([this.initialValue]),
    });
  };

  renderObject = (item, index) => {
    const keys = Object.keys(item);
    return (
      <div>
        {keys.map((key, idx) => (
          <div key={[key, idx].join('__')}>
            <span>{`${this.keyNames[key]}${index + 1}：`}</span>
            <input type="text" value={item[key]} onChange={this.handleItemChange(index, key)} />
          </div>
        ))}
      </div>
    );
  };

  render() {
    const { items } = this.state;

    return (
      <div>
        {items.map((item, index) => (
          <div key={[item, index].join('__')}>
            {this.renderObject(item, index)}
            <button type="button" onClick={() => this.handleRemoveItem(index)}>
              删除
            </button>
          </div>
        ))}
        <button type="button" onClick={this.handleAddItem}>
          添加
        </button>
      </div>
    );
  }
}

DynamicInputs.propTypes = {
  items: PropTypes.array.isRequired,
  keyNames: PropTypes.object.isRequired,
  initialValue: PropTypes.object.isRequired,
};

export default DynamicInputs;
