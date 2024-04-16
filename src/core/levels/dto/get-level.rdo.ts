import { Level } from '#src/core/levels/entities/level.entity';

export class GetLevelRdo {
  id: number;

  name: string;

  constructor(level: Level) {
    this.id = level.id;
    this.name = level.name;
  }
}
