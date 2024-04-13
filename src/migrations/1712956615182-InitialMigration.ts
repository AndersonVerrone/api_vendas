import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1712956615182 implements MigrationInterface {
    name = 'InitialMigration1712956615182'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ratingsProducts" ("id" SERIAL NOT NULL, "rating" integer NOT NULL, "userId" integer, "productId" integer, CONSTRAINT "PK_9efa92c13f9e58b55558b98bab1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorites" ("id" SERIAL NOT NULL, "userId" integer, "productId" integer, CONSTRAINT "PK_890818d27523748dd36a4d1bdc8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "additional_addresses" ("id" SERIAL NOT NULL, "address" character varying(120) NOT NULL, "address_number" character varying(10) NOT NULL, "address_complement" character varying(120) NOT NULL, "cep" character varying(10) NOT NULL, "city" character varying(45) NOT NULL, "state" character varying(45) NOT NULL, "userId" integer, CONSTRAINT "PK_1289d0dd0349d98fd5ee76f0441" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(45) NOT NULL, "email" character varying(45) NOT NULL, "admin" boolean NOT NULL DEFAULT false, "cpfOrCnpj" character varying(45) NOT NULL, "phone" character varying(45) NOT NULL, "photo" character varying(120) NOT NULL, "address" character varying(60) NOT NULL, "address_number" character varying(10) NOT NULL, "address_complement" character varying(120) NOT NULL, "cep" character varying(10) NOT NULL, "city" character varying(45) NOT NULL, "state" character varying(45) NOT NULL, "password" character varying(120) NOT NULL, "gender" character varying(10), "nickname" character varying(45), "profileVisibility" boolean NOT NULL DEFAULT true, "dateOfBirth" date, "bio" text, "facebook" character varying(100), "twitter" character varying(100), "instagram" character varying(100), "newsletter" boolean NOT NULL DEFAULT true, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "deletedAt" date, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "additional_images" ("id" SERIAL NOT NULL, "imageUrl" character varying(255) NOT NULL, "productId" integer, CONSTRAINT "PK_52c9ed34d8882b6668fc402c3b8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying(45) NOT NULL, "description" character varying(255) NOT NULL, "photo" character varying(120) NOT NULL, "stock" integer NOT NULL, "price" numeric(10,2) NOT NULL, "promotion" boolean NOT NULL DEFAULT false, "discountPromotion" numeric(5,2), "size" character varying(10), "height" numeric(10,2), "width" numeric(10,2), "length" numeric(10,2), "weight" numeric(10,2), "cep" character varying(10), "category" character varying(45) NOT NULL, "availability" boolean NOT NULL DEFAULT true, "averageRating" numeric(3,2), "totalRatings" integer, "supplier" character varying(120), "comments" text, "active" boolean NOT NULL DEFAULT true, "userId" integer, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."sales_status_enum" AS ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled')`);
        await queryRunner.query(`CREATE TABLE "sales" ("id" SERIAL NOT NULL, "price" numeric(10,2) NOT NULL, "quantity" integer NOT NULL, "total" numeric(10,2) NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "deletedAt" date, "paymentMethod" character varying(100), "shippingAddress" character varying(100) NOT NULL, "status" "public"."sales_status_enum" NOT NULL DEFAULT 'pending', "shippedAt" TIMESTAMP, "deliveredAt" TIMESTAMP, "TrackingCode" character varying(100), "userId" integer, CONSTRAINT "PK_4f0bc990ae81dba46da680895ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products_tags_tag" ("productsId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_7a77d44e7b0fc1ba44d452b4750" PRIMARY KEY ("productsId", "tagId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9e89c824b4a4252c72911bb208" ON "products_tags_tag" ("productsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_81b9df277a956501f6e0b1f783" ON "products_tags_tag" ("tagId") `);
        await queryRunner.query(`CREATE TABLE "products_sales_sales" ("productsId" integer NOT NULL, "salesId" integer NOT NULL, CONSTRAINT "PK_03c3302b8d3b8dc6ef9e9178a23" PRIMARY KEY ("productsId", "salesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5807a714b714d27554e8f328ac" ON "products_sales_sales" ("productsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_712585b922d89e9af86bd3755e" ON "products_sales_sales" ("salesId") `);
        await queryRunner.query(`CREATE TABLE "sales_products_products" ("salesId" integer NOT NULL, "productsId" integer NOT NULL, CONSTRAINT "PK_62861f1ae04e176c3606ba6bd94" PRIMARY KEY ("salesId", "productsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f29355e1d4d0ea504077a30449" ON "sales_products_products" ("salesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_dc1ade1611cfc9b55ec14c7286" ON "sales_products_products" ("productsId") `);
        await queryRunner.query(`ALTER TABLE "ratingsProducts" ADD CONSTRAINT "FK_9cd69e33e4a66c870f90ab6e55c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ratingsProducts" ADD CONSTRAINT "FK_e1c5c4fec0f4530f7b0d1a579ab" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorites" ADD CONSTRAINT "FK_e747534006c6e3c2f09939da60f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorites" ADD CONSTRAINT "FK_0c7bba48aac77ad13092685ba5b" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "additional_addresses" ADD CONSTRAINT "FK_f240d6669a01c126a634c9da9dc" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "additional_images" ADD CONSTRAINT "FK_d7601d86fe2be2db1fde78ada17" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_99d90c2a483d79f3b627fb1d5e9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_52ff6cd9431cc7687c76f935938" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_tags_tag" ADD CONSTRAINT "FK_9e89c824b4a4252c72911bb2084" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "products_tags_tag" ADD CONSTRAINT "FK_81b9df277a956501f6e0b1f7832" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "products_sales_sales" ADD CONSTRAINT "FK_5807a714b714d27554e8f328ac4" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "products_sales_sales" ADD CONSTRAINT "FK_712585b922d89e9af86bd3755e2" FOREIGN KEY ("salesId") REFERENCES "sales"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sales_products_products" ADD CONSTRAINT "FK_f29355e1d4d0ea504077a30449d" FOREIGN KEY ("salesId") REFERENCES "sales"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "sales_products_products" ADD CONSTRAINT "FK_dc1ade1611cfc9b55ec14c72863" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales_products_products" DROP CONSTRAINT "FK_dc1ade1611cfc9b55ec14c72863"`);
        await queryRunner.query(`ALTER TABLE "sales_products_products" DROP CONSTRAINT "FK_f29355e1d4d0ea504077a30449d"`);
        await queryRunner.query(`ALTER TABLE "products_sales_sales" DROP CONSTRAINT "FK_712585b922d89e9af86bd3755e2"`);
        await queryRunner.query(`ALTER TABLE "products_sales_sales" DROP CONSTRAINT "FK_5807a714b714d27554e8f328ac4"`);
        await queryRunner.query(`ALTER TABLE "products_tags_tag" DROP CONSTRAINT "FK_81b9df277a956501f6e0b1f7832"`);
        await queryRunner.query(`ALTER TABLE "products_tags_tag" DROP CONSTRAINT "FK_9e89c824b4a4252c72911bb2084"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_52ff6cd9431cc7687c76f935938"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_99d90c2a483d79f3b627fb1d5e9"`);
        await queryRunner.query(`ALTER TABLE "additional_images" DROP CONSTRAINT "FK_d7601d86fe2be2db1fde78ada17"`);
        await queryRunner.query(`ALTER TABLE "additional_addresses" DROP CONSTRAINT "FK_f240d6669a01c126a634c9da9dc"`);
        await queryRunner.query(`ALTER TABLE "favorites" DROP CONSTRAINT "FK_0c7bba48aac77ad13092685ba5b"`);
        await queryRunner.query(`ALTER TABLE "favorites" DROP CONSTRAINT "FK_e747534006c6e3c2f09939da60f"`);
        await queryRunner.query(`ALTER TABLE "ratingsProducts" DROP CONSTRAINT "FK_e1c5c4fec0f4530f7b0d1a579ab"`);
        await queryRunner.query(`ALTER TABLE "ratingsProducts" DROP CONSTRAINT "FK_9cd69e33e4a66c870f90ab6e55c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dc1ade1611cfc9b55ec14c7286"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f29355e1d4d0ea504077a30449"`);
        await queryRunner.query(`DROP TABLE "sales_products_products"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_712585b922d89e9af86bd3755e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5807a714b714d27554e8f328ac"`);
        await queryRunner.query(`DROP TABLE "products_sales_sales"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_81b9df277a956501f6e0b1f783"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9e89c824b4a4252c72911bb208"`);
        await queryRunner.query(`DROP TABLE "products_tags_tag"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "sales"`);
        await queryRunner.query(`DROP TYPE "public"."sales_status_enum"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "additional_images"`);
        await queryRunner.query(`DROP TABLE "tag"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "additional_addresses"`);
        await queryRunner.query(`DROP TABLE "favorites"`);
        await queryRunner.query(`DROP TABLE "ratingsProducts"`);
    }

}
