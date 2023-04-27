import { environment } from '../../environments/environment';

export class ServerConstants {
  public static STATUS = environment.BASE_URL + 'api/v2/status';
  public static CREATE_STREAM = environment.BASE_URL + 'api/v2/stream/http';
  public static SEND_DATA_TO_STREAM = environment.PY_URL + 'add-data-stream';
  public static ENROLL = environment.PY_URL + 'enroll';
  public static VOICE_VERIFY = environment.PY_URL + 'voice-verify';

}
