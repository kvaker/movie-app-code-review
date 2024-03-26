import { BaseComponent } from '@components/base-component';
import { TextSkeleton } from '@components/text-skeleton/text-skeleton';
import { TimerService } from '@services/timer.service';
import { formatTime } from '@utils/fomatTime';

import styles from './timer.module.scss';

class TimerComponent extends BaseComponent {
  private readonly timerService: TimerService;
  //Renamed the constructor parameter p to durationInSeconds for clarity.
  constructor(private readonly durationInSeconds: number) {
    super({ className: styles.timer }, TextSkeleton());
    this.timerService = new TimerService(1000); //Moved the initialization of timerService to the constructor.
    this.timerService.subscribe(this);
  }
  //Used more descriptive variable names (elapsedSeconds and remainingTime).
  public update(elapsedSeconds: number): void {
    if (this.durationInSeconds <= elapsedSeconds) {
      this.displayMessage('The premiere has started'); //Introduced a private method displayMessage to improve readability.
      this.timerService.stop();
    } else {
      const remainingTime = this.durationInSeconds - elapsedSeconds;
      this.displayMessage(formatTime(remainingTime));
    }
  }

  public override destroy(): void {
    this.timerService.stop();
    super.destroy();
  }

  private displayMessage(message: string): void {
    this.stc(message);
  }
}

export const Timer = (durationInSeconds: number): TimerComponent => new TimerComponent(durationInSeconds);
