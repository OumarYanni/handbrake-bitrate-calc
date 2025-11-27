/**
 * Defines the core state of the Bitrate Calculator application.
 * This interface mirrors the fields available in the UI form and persisted in LocalStorage.
 */
export interface CalculatorState {
  /** Duration: Hours component (0-99) */
  hours: number;

  /** Duration: Minutes component (0-59). Should be validated by UI inputs. */
  minutes: number;

  /** Duration: Seconds component (0-59). Should be validated by UI inputs. */
  seconds: number;

  /** The target file size limit input by the user (e.g., 1.5, 500) */
  targetSize: number;

  /** The unit for the target size. Used to convert to MB for calculation. */
  targetUnit: "MB" | "GB";

  /**
   * Audio bitrate in kbps.
   * Standard values supported by most encoders (AAC/MP3).
   * Default is usually 160kbps.
   */
  audioBitrate: 128 | 160 | 192 | 320;

  /**
   * Whether to automatically subtract a safety margin (defined as 30MB in logic)
   * from the total available size to prevent upload rejections.
   */
  useSafetyMargin: boolean;

  /**
   * Context for the video resolution.
   * Used primarily for UI warnings (e.g., "Bitrate too low for 4K").
   */
  videoFormat: "FHD" | "4K";
}

/**
 * Default initial state for the application.
 * Optimized for a standard use-case: 1GB limit (Canva upload limit), Standard Audio, FHD source.
 */
export const DEFAULT_STATE: CalculatorState = {
  hours: 0,
  minutes: 0,
  seconds: 0,
  targetSize: 1,
  targetUnit: "GB",
  audioBitrate: 160,
  useSafetyMargin: true,
  videoFormat: "FHD",
};
