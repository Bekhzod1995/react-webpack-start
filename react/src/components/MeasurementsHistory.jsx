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
  Icon,
  Tooltip,
  Tag,
} from 'antd';
import * as actions from '../actions/historyActions';
import displayTotalData from './methodsForHistory';


// const { TabPane } = Tabs;
const { Option } = Select;
const { RangePicker } = DatePicker;
// const { Column, ColumnGroup } = Table;


const mapStateToProps = (state) => ({
  isMeasurementsLoaded: state.historyHandler.isMeasurementsLoaded,
  dataForMeasurements: state.historyHandler.dataForMeasurements,
  // errorList: state.historyHandler.errorList,
  // isErrorListLoaded: state.historyHandler.isErrorListLoaded,
});

@connect(mapStateToProps, actions)
class Measurements extends Component {
  componentDidMount = () => {
    this.props.form.validateFields();
    // this.getErrorsList();
  }

  state = {
    date: '',
    transformerIdForMeasurements: '',
    transformerIdForStates: '',
    tab: '',
  }

  showToolTip = (error) => {
    const { errorList } = this.props;
    console.log('errorsss: ', error);
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

  columnsForMeasurements = [
    {
      title: 'Дата',
      dataIndex: 'date',
    },
    {
      title: 'Время',
      dataIndex: 'time',
    },
    {
      title: 'Ф1',
      children: [
        {
          title: 'U1 (Volt)',
          dataIndex: 'u1',
        },
        {
          title: 'I1 (mA)',
          dataIndex: 'i1',
        },
        {
          title: 'P1 (VA)',
          dataIndex: 'p1',
        },
      ],
    },
    {
      title: 'Ф2',
      children: [
        {
          title: 'U2 (Volt)',
          dataIndex: 'u2',
        },
        {
          title: 'I2 (mA)',
          dataIndex: 'i2',
        },
        {
          title: 'P2 (VA)',
          dataIndex: 'p2',
        },
      ],
    },
    {
      title: 'Ф3',
      children: [
        {
          title: 'U3 (Volt)',
          dataIndex: 'u3',
        },
        {
          title: 'I3 (mA)',
          dataIndex: 'i3',
        },
        {
          title: 'P3 (VA)',
          dataIndex: 'p3',
        },
      ],
    },
    {
      title: 'Ошибка',
      dataIndex: 'error',
      render: (error) => {
        // console.log('This is error: ', error);
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
      title: 'e-active',
      dataIndex: 'eactive',
    },
    {
      title: 'e-reactive',
      dataIndex: 'ereactive',
    },
  ];

  dispalyTags = (warningValues, key, value) => {
    if (warningValues.includes(key)) {
      return <Tag color="red">{value}</Tag>;
    }
    return value;
  }

  displayMeasurementsData = () => {
    const { dataForMeasurements } = this.props;
    if (dataForMeasurements) {
      const dataToDisplay = dataForMeasurements.results.map((data, key) => {
        const period = new Date(data.time);
        return {
          key: `${key}`,
          date: period.toLocaleDateString(),
          time: period.toLocaleTimeString('it-IT'),
          u1: data.is_warning ? this.dispalyTags(data.warning_values, 'u1', data.u1) : data.u1,
          u2: data.is_warning ? this.dispalyTags(data.warning_values, 'u2', data.u2) : data.u2,
          u3: data.is_warning ? this.dispalyTags(data.warning_values, 'u3', data.u3) : data.u3,
          error: data.error,
          eactive: data.e_active,
          ereactive: data.e_reactive,
          i1: data.i1,
          i2: data.i2,
          i3: data.i3,
          p1: data.p1,
          p2: data.p2,
          p3: data.p3,
        };
      });
      return dataToDisplay;
    }
    return null;
  }

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

  handleSubmitForMeasurements = (e) => {
    e.preventDefault();
    const { getMeasurements } = this.props;
    const { date } = this.state;
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        if (!values.transformersMeasurements) {
          notification.error({
            message: 'Трансформатор не выбран',
            description: 'Пожалуйста, выберите трансформатор для фильтра',
          });
        } else {
          await this.setState({
            transformerIdForMeasurements: values.transformersMeasurements,
          });
          const { transformerIdForMeasurements } = this.state;
          getMeasurements(transformerIdForMeasurements, {
            time_after: date[0] ? date[0] : undefined,
            time_before: date[1] ? date[1] : undefined,
            page: 1,
            page_size: 50,
            transformers: undefined,
            period: undefined,
            error: values.errors === 'all' ? undefined : values.errors,
            is_warning: values.is_warning === 'all' ? undefined : values.is_warning,
          });
        }
      }
      return null;
    });
  };

  handleTimeInterval = (date, dateString) => {
    this.setState({
      date: dateString,
    });
  }

  /*eslint-disable */


  /******************** CAN COMBINE  *******************/
  handlePaginationChangeForMeasurements = (page, page_size) => {
    const { getMeasurements } = this.props;
    const { transformerIdForMeasurements } = this.state;
    getMeasurements(transformerIdForMeasurements, { page, page_size });
    return null;
  }
  // displayTotalForMeasurements = () => {
  //   const { dataForMeasurements } = this.props;
  //   if (dataForMeasurements) {
  //     return dataForMeasurements.count;
  //   }
  //   return null;
  // }

  /******************** CAN COMBINE  *******************/
  /* eslint-enable */


  displayFormForMeasurements = () => {
    const {
      getFieldDecorator,
    } = this.props.form;
    const { isErrorListLoaded, isTransformersListLoaded } = this.props;
    return (
      <Form
        onSubmit={this.handleSubmitForMeasurements}
        className="login-form"
        style={{ backgroundColor: 'white' }}
        layout="inline"
      >
        <Form.Item
          label="Трансформатор">
          {getFieldDecorator('transformersMeasurements')(
            <Select
              placeholder="Выберите трансформатор"
              style={{ width: 200 }}
              loading={!isTransformersListLoaded}
            >
              {this.displayTransformersList()}
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="Статус предупреждений">
          {getFieldDecorator('is_warning', {
            initialValue: 'all',
          })(
            <Select
              style={{ width: 170 }}
              // loading={!isErrorListLoaded}
              placeholder='Все'
            >
              <Option value="all">Все</Option>
              <Option value="true">С предупреждений</Option>
              <Option value="false">Без предупреждений</Option>
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
              <Option value="all">Все </Option>
              {this.displayErrorsList()}
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="Выберите дату">
          {getFieldDecorator('periodMeasurements')(
            <RangePicker
              onChange={this.handleTimeInterval}
              placeholder={['Начальное время', 'Время окончания']}
              showTime
              ranges={{
                Сегодня: [moment().startOf('day'), moment()],
                'Этот месяц': [moment().startOf('month'), moment()],
                'Пред. месяц': [moment().month(-1).startOf('month'), moment().month(-1).endOf('month')],
              }}
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

  render() {
    const { isMeasurementsLoaded, dataForMeasurements } = this.props;
    return (
      <div>
        {this.displayFormForMeasurements()}
        <br />
        <h3> Найдено кол-во: {displayTotalData(dataForMeasurements)}</h3>
        <Table
          columns={this.columnsForMeasurements}
          dataSource={this.displayMeasurementsData()}
          bordered
          pagination={{
            total: displayTotalData(dataForMeasurements),
            defaultPageSize: 50,
            onChange: this.handlePaginationChangeForMeasurements,
          }}
          loading={!isMeasurementsLoaded}
        />
      </div>
    );
  }
}
const WrappedMeasurements = Form.create()(Measurements);
export default WrappedMeasurements;
