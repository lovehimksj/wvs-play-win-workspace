import { Column, Entity } from "typeorm";

@Entity("hibernate_sequence")
export default class HibernateSequence {
  @Column("bigint", { name: "next_val", nullable: true })
  nextVal: string | null;

  constructor(init?: Partial<HibernateSequence>) {
    Object.assign(this, init);
  }
}
