"""empty message

Revision ID: 78433301b5e8
Revises: 26b2f0687192
Create Date: 2024-06-09 21:53:47.503130

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '78433301b5e8'
down_revision = '26b2f0687192'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('states')
    with op.batch_alter_table('itinerary_place', schema=None) as batch_op:
        batch_op.alter_column('photo_url',
               existing_type=sa.VARCHAR(length=255),
               type_=sa.Text(),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('itinerary_place', schema=None) as batch_op:
        batch_op.alter_column('photo_url',
               existing_type=sa.Text(),
               type_=sa.VARCHAR(length=255),
               existing_nullable=True)

    op.create_table('states',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('name', sa.VARCHAR(length=100), autoincrement=False, nullable=False),
    sa.PrimaryKeyConstraint('id', name='states_pkey')
    )
    # ### end Alembic commands ###