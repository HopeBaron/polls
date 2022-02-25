export class Choice {
  id: number;
  proposal: string;
  up_vote: number;
  down_vote: number;

  constructor(
    id: number,
    proposal: string,
    up_vote: number,
    down_vote: number
  ) {
    this.id = id;
    this.proposal = proposal;
    this.up_vote = up_vote;
    this.down_vote = down_vote;
  }
  score(): number {
    return this.up_vote - this.down_vote;
  }
}
