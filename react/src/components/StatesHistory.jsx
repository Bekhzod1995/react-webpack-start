import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  Table,
  Form,
  Select,
  Button,
  DatePicker,
  notification,
  Tooltip,
  Icon,
} from 'antd';
import * as actions from '../actions/historyActions';
import displayTotalData from './methodsForHistory';

const { Option } = Select;
const { RangePicker } = DatePicker;

const mapStateToProps = (state) => ({
  isStatesLoaded: state.historyHandler.isStatesLoaded,
  dataForStates: state.historyHandler.dataForStates,
});

@connect(mapStateToProps, actions)
class States extends Component {
  componentDidMount = () => {
    this.props.form.validateFields();
  }

  state = {
    date: '',
    transformerIdForMeasurements: '',
    transformerIdForStates: '',
    tab: '',
  }

  showToolTip = (error) => {
    const { errorList } = this.props;
    if (error !== 0) {
      const codeDescription = errorList.filter((errorCode) => errorCode.code === error);
      return (
        <Tooltip title={codeDescription[0].text}>
          <Icon type="warning" theme="twoTone" twoToneColor="red" />
        </Tooltip>
      );
    }
    return null;
  };

  columnsForStates = [
    {
      title: 'Дата',
      dataIndex: 'date',
    },
    {
      title: 'Время',
      dataIndex: 'time',
    },
    {
      title: 'Ошибка',
      dataIndex: 'error',
      render: (error) => {
        if (error !== null) {
          return (
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              {error}
              {this.showToolTip(error)}
            </div>
          );
        }
        return null;
      },
    },
    {
      title: 'Статус',
      dataIndex: 'isActive',
    },
  ];

  displayStatesData = () => {
    const { dataForStates } = this.props;
    if (dataForStates) {
      const dataToDisplay = dataForStates.results.map((data, key) => {
        const period = new Date(data.time);
        return {
          key: `${key}`,
          date: period.toLocaleDateString(),
          time: period.toLocaleTimeString('it-IT'),
          error: data.error,
          isActive: data.is_active ? 'Активен' : 'Неактивный',
        };
      });
      return dataToDisplay;
    }
    return null;
  };

  displayErrorsList = () => {
    const { errorList } = this.props;
    if (errorList) {
      const List = errorList.map((list) => (
        <Option value={list.code} key={list.code}>
          {list.code}- {list.text}
        </Option>
      ));
      return List;
    }
    return null;
  }

  handleSubmitForStates = (e) => {
    e.preventDefault();
    const { getStates } = this.props;
    const { date } = this.state;
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        if (!values.transformersState) {
          notification.error({
            message: 'Трансформатор не выбран',
            description: 'Пожалуйста, выберите трансформатор для фильтра',
          });
        } else {
          await this.setState({
            transformerIdForStates: values.transformersState,
          });
          const { transformerIdForStates } = this.state;
          getStates(transformerIdForStates, {
            time_after: date[0] ? date[0] : undefined,
            time_before: date[1] ? date[1] : undefined,
            page: 1,
            page_size: 50,
            transformers: undefined,
            period: undefined,
            error: values.errors === 'all' ? undefined : values.errors,
          });
        }
      }
      return null;
    });
  };

  displayTransformersList = () => {
    const { transformersList } = this.props;
    if (transformersList) {
      const Transformers = transformersList.map((transformer) => (
        <Option value={transformer.id} key={transformer.id}>
          {transformer.id}- {transformer.name}
        </Option>
      ));
      return Transformers;
    }
    return null;
  }

  handleTimeInterval = (date, dateString) => {
    this.setState({
      date: dateString,
    });
  }

  displayFormForStates = () => {
    const {
      getFieldDecorator,
    } = this.props.form;
    const { isErrorListLoaded } = this.props;
    return (
      <Form
        onSubmit={this.handleSubmitForStates}
        className="login-form"
        style={{ backgroundColor: 'white' }}
        layout="inline"
      >
        <Form.Item
          label="Трансформатор">
          {getFieldDecorator('transformersState')(
            <Select
              placeholder="Выберите трансформатор"
              style={{ width: 200 }}
            >
             {this.displayTransformersList()}
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="Статус ошибок">
          {getFieldDecorator('errors', {
            initialValue: 'all',
          })(
            <Select
              style={{ width: 300 }}
              loading={!isErrorListLoaded}
              placeholder='Все'
            >
              <Option value="all">Все</Option>
              {this.displayErrorsList()}
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="Выберите дату">
          {getFieldDecorator('periodState')(
            <RangePicker
              onChange={this.handleTimeInterval}
              showTime
              ranges={{
                Сегодня: [moment(), moment()],
                'Этот месяц': [moment().startOf('month'), moment().endOf('month')],
              }}
              placeholder={['Начальное время', 'Время окончания']}
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }

  handlePaginationChangeForStates = (page, pageSize) => {
    const { getStates } = this.props;
    const { transformerIdForStates } = this.state;
    getStates(transformerIdForStates, { page, page_size: pageSize });
    return null;
  }

  render() {
    const { isStatesLoaded, dataForStates } = this.props;
    return (
      <div>
              {this.displayFormForStates()}
              <br />
              <h3>Найдено кол-во: {displayTotalData(dataForStates)}</h3>
              <Table
                columns={this.columnsForStates}
                dataSource={this.displayStatesData()}
                bordered
                pagination={{
                  total: displayTotalData(dataForStates),
                  defaultPageSize: 50,
                  onChange: this.handlePaginationChangeForStates,
                }}
                loading={!isStatesLoaded}
              />
      </div>
    );
  }
}
const WrappedStates = Form.create()(States);
export default WrappedStates;
