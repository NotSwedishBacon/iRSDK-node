// Type definitions for constants
export const IRSDK_DATAVALIDEVENTNAME: string;
export const IRSDK_MEMMAPFILENAME: string;
export const IRSDK_BROADCASTMSGNAME: string;
export namespace irsdk_StatusField {
  const irsdk_stConnected: number;
}
export namespace irsdk_VarType {
  const irsdk_bool: number;
  const irsdk_bitField: number;
  const irsdk_float: number;
}
export namespace irsdk_TrkLoc {
  const irsdk_NotInWorld: number;
  const irsdk_OffTrack: number;
  const irsdk_InPitStall: number;
  const irsdk_OnTrack: number;
}
export namespace irsdk_TrkSurf {
  const irsdk_SurfaceNotInWorld: number;
  const irsdk_UndefinedMaterial: number;
  const irsdk_Asphalt1Material: number;
  const irsdk_Asphalt2Material: number;
  const irsdk_Asphalt3Material: number;
  const irsdk_Asphalt4Material: number;
  const irsdk_Concrete1Material: number;
  const irsdk_Concrete2Material: number;
  const irsdk_RacingDirt1Material: number;
  const irsdk_RacingDirt2Material: number;
  const irsdk_Paint1Material: number;
  const irsdk_Paint2Material: number;
  const irsdk_Rumble1Material: number;
  const irsdk_Rumble2Material: number;
  const irsdk_Rumble3Material: number;
  const irsdk_Rumble4Material: number;
  const irsdk_Grass1Material: number;
  const irsdk_Grass2Material: number;
  const irsdk_Grass3Material: number;
  const irsdk_Grass4Material: number;
  const irsdk_Dirt1Material: number;
  const irsdk_Dirt2Material: number;
  const irsdk_Dirt3Material: number;
  const irsdk_Dirt4Material: number;
  const irsdk_SandMaterial: number;
  const irsdk_Gravel1Material: number;
  const irsdk_Gravel2Material: number;
  const irsdk_GrasscreteMaterial: number;
  const irsdk_AstroturfMaterial: number;
}
export namespace irsdk_SessionState {
  const irsdk_StateInvalid: number;
  const irsdk_StateGetInCar: number;
  const irsdk_StateWarmup: number;
  const irsdk_StateParadeLaps: number;
  const irsdk_StateRacing: number;
  const irsdk_StateCheckered: number;
  const irsdk_StateCoolDown: number;
}
export namespace irsdk_CarLeftRight {
  const irsdk_LROff: number;
  const irsdk_LRClear: number;
}
export namespace irsdk_PitSvStatus {
  const irsdk_PitSvInProgress: number;
  const irsdk_PitSvComplete: number;
  const irsdk_PitSvTooFarRight: number;
  const irsdk_PitSvTooFarForward: number;
  const irsdk_PitSvTooFarBack: number;
  const irsdk_PitSvBadAngle: number;
  const irsdk_PitSvCantFixThat: number;
}
export namespace irsdk_PaceMode {
  const irsdk_PaceModeSingleFileStart: number;
  const irsdk_PaceModeDoubleFileStart: number;
  const irsdk_PaceModeSingleFileRestart: number;
  const irsdk_PaceModeDoubleFileRestart: number;
  const irsdk_PaceModeNotPacing: number;
}
export namespace irsdk_TrackWetness {
  const irsdk_TrackWetness_UNKNOWN: number;
  const irsdk_TrackWetness_Dry: number;
  const irsdk_TrackWetness_MostlyDry: number;
  const irsdk_TrackWetness_VeryLightlyWet: number;
  const irsdk_TrackWetness_LightlyWet: number;
  const irsdk_TrackWetness_ModeratelyWet: number;
  const irsdk_TrackWetness_VeryWet: number;
  const irsdk_TrackWetness_ExtremelyWet: number;
}
export namespace irsdk_IncidentFlags {
  const IRSDK_INCIDENT_PEN_MASK: number;
}
export namespace irsdk_EngineWarnings {
  const irsdk_waterTempWarning: number;
  const irsdk_fuelPressureWarning: number;
  const irsdk_oilPressureWarning: number;
  const irsdk_engineStalled: number;
  const irsdk_pitSpeedLimiter: number;
  const irsdk_revLimiterActive: number;
  const irsdk_oilTempWarning: number;
  const irsdk_mandRepNeeded: number;
}
export namespace irsdk_Flags {
  const irsdk_white: number;
  const irsdk_green: number;
  const irsdk_yellow: number;
  const irsdk_red: number;
  const irsdk_blue: number;
  const irsdk_debris: number;
  const irsdk_crossed: number;
  const irsdk_yellowWaving: number;
  const irsdk_oneLapToGreen: number;
  const irsdk_greenHeld: number;
  const irsdk_tenToGo: number;
  const irsdk_fiveToGo: number;
  const irsdk_randomWaving: number;
  const irsdk_caution: number;
  const irsdk_cautionWaving: number;
  const irsdk_disqualify: number;
  const irsdk_servicible: number;
  const irsdk_repair: number;
  const irsdk_dqScoringInvalid: number;
  const irsdk_startReady: number;
  const irsdk_startSet: number;
  const irsdk_startGo: number;
}
export namespace irsdk_CameraState {
  const irsdk_IsSessionScreen: number;
  const irsdk_UIHidden: number;
  const irsdk_UseAutoShotSelection: number;
  const irsdk_UseTemporaryEdits: number;
  const irsdk_UseKeyAcceleration: number;
  const irsdk_UseKey10xAcceleration: number;
  const irsdk_UseMouseAimMode: number;
}
export namespace irsdk_PitSvFlags {
  const irsdk_LFTireChange: number;
  const irsdk_RFTireChange: number;
  const irsdk_LRTireChange: number;
  const irsdk_RRTireChange: number;
  const irsdk_FuelFill: number;
  const irsdk_WindshieldTearoff: number;
  const irsdk_FastRepair: number;
}
export namespace irsdk_PaceFlags {
  const irsdk_PaceFlagsEndOfLine: number;
  const irsdk_PaceFlagsFreePass: number;
  const irsdk_PaceFlagsWavedAround: number;
}
export namespace irsdk_BroadcastMsg {
  const irsdk_BroadcastCamSwitchPos: number;
  const group: number;
  const group: number;
  const unused: number;
  const slowMotion: number;
  const unused: number;
  const unused: number;
  const carIdx: number;
  const subCommand: number;
  const unused: number;
  const high: number;
  const unused: number;
}
export namespace irsdk_ChatCommandMode {
  const irsdk_ChatCommand_Macro: number;
}
export namespace irsdk_RpyStateMode {
  const irsdk_RpyState_EraseTape: number;
}
export namespace irsdk_ReloadTexturesMode {
  const irsdk_ReloadTextures_All: number;
}
export namespace irsdk_RpySrchMode {
  const irsdk_RpySrch_ToStart: number;
  const irsdk_RpySrch_ToEnd: number;
  const irsdk_RpySrch_PrevSession: number;
  const irsdk_RpySrch_NextSession: number;
  const irsdk_RpySrch_PrevLap: number;
  const irsdk_RpySrch_NextLap: number;
  const irsdk_RpySrch_PrevFrame: number;
  const irsdk_RpySrch_NextFrame: number;
  const irsdk_RpySrch_PrevIncident: number;
  const irsdk_RpySrch_NextIncident: number;
  const irsdk_RpySrch_Last: number;
}
export namespace irsdk_RpyPosMode {
  const irsdk_RpyPos_Begin: number;
  const irsdk_RpyPos_Current: number;
  const irsdk_RpyPos_End: number;
  const irsdk_RpyPos_Last: number;
}
export namespace irsdk_csMode {
  const irsdk_csFocusAtIncident: number;
  const irsdk_csFocusAtLeader: number;
  const irsdk_csFocusAtExiting: number;
}
export namespace irsdk_VideoCaptureMode {
  const irsdk_VideoCapture_TriggerScreenShot: number;
}