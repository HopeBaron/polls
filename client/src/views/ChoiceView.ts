import Service from "@/api/service";
import { choices_service } from "@/main";
import { Choice } from "@/models/Choice";
/**
 * A View object meant to incapsulate interface changes for a Choice
 */
export default class ChoiceView {
  private choice: Choice;
  private id: number;
  private service: Service = choices_service;
  constructor(initialChoice: Choice) {
    this.choice = initialChoice;
    this.id = this.choice.id;
  }
  async upVote() {
    this.choice = await this.service.up_vote(this.id);
  }
  async downVote() {
    this.choice = await this.service.down_vote(this.id);
  }
  delete(token: string) {
    this.service.delete(this.id, token);
  }
  getProposal(): string {
    return this.choice.proposal;
  }

  getDownVotes(): number {
    return this.choice.down_vote;
  }

  getUpVotes(): number {
    return this.choice.up_vote;
  }
  getId(): number {
    return this.choice.id;
  }
  getScore(): number {
    return this.choice.score();
  }
}
