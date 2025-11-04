// Auto-generated constants from iRacing SDK
export const IRSDK_DATAVALIDEVENTNAME = "Local\\IRSDKDataValidEvent";
export const IRSDK_MEMMAPFILENAME = "Local\\IRSDKMemMapFileName";
export const IRSDK_BROADCASTMSGNAME = "IRSDK_BROADCASTMSG";

export const irsdk_StatusField = {
  irsdk_stConnected: 1,
};

export const irsdk_VarType = {
  irsdk_bool: undefined,
  irsdk_bitField: undefined,
  irsdk_float: undefined,
};

export const irsdk_TrkLoc = {
  irsdk_NotInWorld: -1,
  irsdk_OffTrack: 0,
  irsdk_InPitStall: undefined,
  irsdk_OnTrack: undefined,
};

export const irsdk_TrkSurf = {
  irsdk_SurfaceNotInWorld: -1,
  irsdk_UndefinedMaterial: 0,
  irsdk_Asphalt1Material: undefined,
  irsdk_Asphalt2Material: undefined,
  irsdk_Asphalt3Material: undefined,
  irsdk_Asphalt4Material: undefined,
  irsdk_Concrete1Material: undefined,
  irsdk_Concrete2Material: undefined,
  irsdk_RacingDirt1Material: undefined,
  irsdk_RacingDirt2Material: undefined,
  irsdk_Paint1Material: undefined,
  irsdk_Paint2Material: undefined,
  irsdk_Rumble1Material: undefined,
  irsdk_Rumble2Material: undefined,
  irsdk_Rumble3Material: undefined,
  irsdk_Rumble4Material: undefined,
  irsdk_Grass1Material: undefined,
  irsdk_Grass2Material: undefined,
  irsdk_Grass3Material: undefined,
  irsdk_Grass4Material: undefined,
  irsdk_Dirt1Material: undefined,
  irsdk_Dirt2Material: undefined,
  irsdk_Dirt3Material: undefined,
  irsdk_Dirt4Material: undefined,
  irsdk_SandMaterial: undefined,
  irsdk_Gravel1Material: undefined,
  irsdk_Gravel2Material: undefined,
  irsdk_GrasscreteMaterial: undefined,
  irsdk_AstroturfMaterial: undefined,
};

export const irsdk_SessionState = {
  irsdk_StateInvalid: 0,
  irsdk_StateGetInCar: undefined,
  irsdk_StateWarmup: undefined,
  irsdk_StateParadeLaps: undefined,
  irsdk_StateRacing: undefined,
  irsdk_StateCheckered: undefined,
  irsdk_StateCoolDown: undefined,
};

export const irsdk_CarLeftRight = {
  irsdk_LROff: 0,
  irsdk_LRClear: undefined,
};

export const irsdk_PitSvStatus = {
  irsdk_PitSvInProgress: undefined,
  irsdk_PitSvComplete: undefined,
  irsdk_PitSvTooFarRight: undefined,
  irsdk_PitSvTooFarForward: undefined,
  irsdk_PitSvTooFarBack: undefined,
  irsdk_PitSvBadAngle: undefined,
  irsdk_PitSvCantFixThat: undefined,
};

export const irsdk_PaceMode = {
  irsdk_PaceModeSingleFileStart: 0,
  irsdk_PaceModeDoubleFileStart: undefined,
  irsdk_PaceModeSingleFileRestart: undefined,
  irsdk_PaceModeDoubleFileRestart: undefined,
  irsdk_PaceModeNotPacing: undefined,
};

export const irsdk_TrackWetness = {
  irsdk_TrackWetness_UNKNOWN: 0,
  irsdk_TrackWetness_Dry: undefined,
  irsdk_TrackWetness_MostlyDry: undefined,
  irsdk_TrackWetness_VeryLightlyWet: undefined,
  irsdk_TrackWetness_LightlyWet: undefined,
  irsdk_TrackWetness_ModeratelyWet: undefined,
  irsdk_TrackWetness_VeryWet: undefined,
  irsdk_TrackWetness_ExtremelyWet: undefined,
};

export const irsdk_IncidentFlags = {
  IRSDK_INCIDENT_PEN_MASK: 0x0000FF00,
};

export const irsdk_EngineWarnings = {
  irsdk_waterTempWarning: 0x0001,
  irsdk_fuelPressureWarning: 0x0002,
  irsdk_oilPressureWarning: 0x0004,
  irsdk_engineStalled: 0x0008,
  irsdk_pitSpeedLimiter: 0x0010,
  irsdk_revLimiterActive: 0x0020,
  irsdk_oilTempWarning: 0x0040,
  irsdk_mandRepNeeded: 0x0080,
};

export const irsdk_Flags = {
  irsdk_white: 0x00000002,
  irsdk_green: 0x00000004,
  irsdk_yellow: 0x00000008,
  irsdk_red: 0x00000010,
  irsdk_blue: 0x00000020,
  irsdk_debris: 0x00000040,
  irsdk_crossed: 0x00000080,
  irsdk_yellowWaving: 0x00000100,
  irsdk_oneLapToGreen: 0x00000200,
  irsdk_greenHeld: 0x00000400,
  irsdk_tenToGo: 0x00000800,
  irsdk_fiveToGo: 0x00001000,
  irsdk_randomWaving: 0x00002000,
  irsdk_caution: 0x00004000,
  irsdk_cautionWaving: 0x00008000,
  irsdk_disqualify: 0x00020000,
  irsdk_servicible: 0x00040000,
  irsdk_repair: 0x00100000,
  irsdk_dqScoringInvalid: 0x00200000,
  irsdk_startReady: 0x20000000,
  irsdk_startSet: 0x40000000,
  irsdk_startGo: 0x80000000,
};

export const irsdk_CameraState = {
  irsdk_IsSessionScreen: 0x0001,
  irsdk_UIHidden: 0x0008,
  irsdk_UseAutoShotSelection: 0x0010,
  irsdk_UseTemporaryEdits: 0x0020,
  irsdk_UseKeyAcceleration: 0x0040,
  irsdk_UseKey10xAcceleration: 0x0080,
  irsdk_UseMouseAimMode: 0x0100,
};

export const irsdk_PitSvFlags = {
  irsdk_LFTireChange: 0x0001,
  irsdk_RFTireChange: 0x0002,
  irsdk_LRTireChange: 0x0004,
  irsdk_RRTireChange: 0x0008,
  irsdk_FuelFill: 0x0010,
  irsdk_WindshieldTearoff: 0x0020,
  irsdk_FastRepair: 0x0040,
};

export const irsdk_PaceFlags = {
  irsdk_PaceFlagsEndOfLine: 0x0001,
  irsdk_PaceFlagsFreePass: 0x0002,
  irsdk_PaceFlagsWavedAround: 0x0004,
};

export const irsdk_BroadcastMsg = {
  irsdk_BroadcastCamSwitchPos: 0,
  group: undefined,
  group: undefined,
  unused: undefined,
  slowMotion: undefined,
  unused: undefined,
  unused: undefined,
  carIdx: undefined,
  subCommand: undefined,
  unused: undefined,
  high: undefined,
  unused: undefined,
};

export const irsdk_ChatCommandMode = {
  irsdk_ChatCommand_Macro: 0,
};

export const irsdk_RpyStateMode = {
  irsdk_RpyState_EraseTape: 0,
};

export const irsdk_ReloadTexturesMode = {
  irsdk_ReloadTextures_All: 0,
};

export const irsdk_RpySrchMode = {
  irsdk_RpySrch_ToStart: 0,
  irsdk_RpySrch_ToEnd: undefined,
  irsdk_RpySrch_PrevSession: undefined,
  irsdk_RpySrch_NextSession: undefined,
  irsdk_RpySrch_PrevLap: undefined,
  irsdk_RpySrch_NextLap: undefined,
  irsdk_RpySrch_PrevFrame: undefined,
  irsdk_RpySrch_NextFrame: undefined,
  irsdk_RpySrch_PrevIncident: undefined,
  irsdk_RpySrch_NextIncident: undefined,
  irsdk_RpySrch_Last: undefined,
};

export const irsdk_RpyPosMode = {
  irsdk_RpyPos_Begin: 0,
  irsdk_RpyPos_Current: undefined,
  irsdk_RpyPos_End: undefined,
  irsdk_RpyPos_Last: undefined,
};

export const irsdk_csMode = {
  irsdk_csFocusAtIncident: -3,
  irsdk_csFocusAtLeader: -2,
  irsdk_csFocusAtExiting: -1,
};

export const irsdk_VideoCaptureMode = {
  irsdk_VideoCapture_TriggerScreenShot: 0,
};