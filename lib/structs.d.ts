// Type definitions for structs
export interface irsdk_varHeader {
  /** int */
  type: number;
  /** char[3] */
  pad: string;
  /** char[IRSDK_MAX_DESC] */
  desc: string;
  /** char[IRSDK_MAX_STRING] */
  unit: string;
}
export interface irsdk_varBuf {
  /** int */
  tickCount: number;
}
export interface irsdk_header {
  /** int */
  ver: number;
}
export interface irsdk_diskSubHeader {
  /** time_t */
  sessionStartDate: number;
  /** double */
  sessionStartTime: number;
  /** double */
  sessionEndTime: number;
  /** int */
  sessionLapCount: number;
  /** int */
  sessionRecordCount: number;
}