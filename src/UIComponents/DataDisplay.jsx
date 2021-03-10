/* React component to handle displaying imported data. */
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { getEmptyCellDetails, setCurrentColumn } from "../redux";
import { styles } from "../constants";

class DataDisplay extends Component {
  static propTypes = {
    data: PropTypes.array,
    labelColumn: PropTypes.string,
    selectedFeatures: PropTypes.array,
    emptyCellDetails: PropTypes.array,
    setCurrentColumn: PropTypes.func,
    currentColumn: PropTypes.string,
    previousColumn: PropTypes.string,
    currentPanel: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      showRawData: true,
      showEmptyCellDetails: false
    };
  }

  toggleRawData = () => {
    this.setState({
      showRawData: !this.state.showRawData
    });
  };

  toggleEmptyCellDetails = () => {
    this.setState({
      showEmptyCellDetails: !this.state.showEmptyCellDetails
    });
  };

  getColumnHeaderStyle = key => {
    let style;

    if (key === this.props.currentColumn || key === this.props.previousColumn) {
      if (key === this.props.labelColumn) {
        style = styles.dataDisplayHeaderLabelSelected;
      } else if (this.props.selectedFeatures.includes(key)) {
        style = styles.dataDisplayHeaderFeatureSelected;
      } else {
        style = styles.dataDisplayHeaderSelected;
      }
    } else {
      if (key === this.props.labelColumn) {
        style = styles.dataDisplayHeaderLabelUnselected;
      } else if (this.props.selectedFeatures.includes(key)) {
        style = styles.dataDisplayHeaderFeatureUnselected;
      } else {
        style = styles.dataDisplayHeaderUnselected;
      }
    }

    return { ...style, ...styles.dataDisplayHeader };
  };

  getColumnCellStyle = key => {
    let style;

    if (key === this.props.currentColumn || key === this.props.previousColumn) {
      if (key === this.props.labelColumn) {
        style = styles.dataDisplayCellLabelSelected;
      } else if (this.props.selectedFeatures.includes(key)) {
        style = styles.dataDisplayCellFeatureSelected;
      } else {
        style = styles.dataDisplayCellSelected;
      }
    } else {
      if (key === this.props.labelColumn) {
        style = styles.dataDisplayCellLabelUnselected;
      } else if (this.props.selectedFeatures.includes(key)) {
        style = styles.dataDisplayCellFeatureUnselected;
      } else {
        style = styles.dataDisplayCellUnselected;
      }
    }

    return { ...style, ...styles.dataDisplayCell };
  };

  render() {
    const { data, setCurrentColumn, currentPanel } = this.props;

    return (
      <div id="data-display" style={styles.panel}>
        <div style={styles.largeText}>
          {currentPanel === "dataDisplaySingle" && (
            <div>Select a column to view its information:</div>
          )}
          {currentPanel === "dataDisplayDouble" && (
            <div>Select two columns to view their correlation:</div>
          )}
          {currentPanel === "dataDisplayLabel" && (
            <div>Select one column to predict:</div>
          )}
          {currentPanel === "dataDisplayFeatures" && (
            <div>Select one or more columns to do the prediction:</div>
          )}
        </div>

        {["dataDisplayLabel", "dataDisplayFeatures"].includes(currentPanel) && (
          <div style={styles.statement}>
            Predict{" "}
            <span style={styles.statementLabel}>
              {this.props.labelColumn || "..."}
            </span>
            {currentPanel === "dataDisplayFeatures" && (
              <span>
                {" "}
                based on{" "}
                <span style={styles.statementFeature}>
                  {this.props.selectedFeatures.length > 0
                    ? this.props.selectedFeatures.join(", ")
                    : ".."}
                </span>
                {"."}
              </span>
            )}
            <br />
          </div>
        )}

        {this.state.showRawData && (
          <div style={styles.tableParent}>
            <table id="data-display" style={styles.dataDisplayTable}>
              <thead>
                <tr>
                  {data.length > 0 &&
                    Object.keys(data[0]).map(key => {
                      return (
                        <th
                          key={key}
                          style={this.getColumnHeaderStyle(key)}
                          onClick={() => setCurrentColumn(key)}
                        >
                          {key}
                        </th>
                      );
                    })}
                </tr>
              </thead>
              <tbody>
                {data.length > 0 &&
                  data.map((row, index) => {
                    return (
                      <tr key={index}>
                        {data.length > 0 &&
                          Object.keys(row).map(key => {
                            return (
                              <td
                                key={key}
                                style={this.getColumnCellStyle(key)}
                                onClick={() => setCurrentColumn(key)}
                              >
                                {row[key]}
                              </td>
                            );
                          })}
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}
        {!this.state.showRawData && (
          <button type="button" onClick={this.toggleRawData}>
            show data
          </button>
        )}
        <div style={styles.mediumText}>
          There are {this.props.data.length} rows of data.
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    data: state.data,
    labelColumn: state.labelColumn,
    selectedFeatures: state.selectedFeatures,
    emptyCellDetails: getEmptyCellDetails(state),
    currentColumn: state.currentColumn,
    previousColumn: state.previousColumn,
    currentPanel: state.currentPanel
  }),
  dispatch => ({
    setCurrentColumn(column) {
      dispatch(setCurrentColumn(column));
    }
  })
)(DataDisplay);
