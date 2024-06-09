"""empty message

Revision ID: 51ca14e11497
Revises: 11e89dcfe14b
Create Date: 2024-06-08 20:28:52.564272

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '51ca14e11497'
down_revision = '11e89dcfe14b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('itinerary_place',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('photo_url', sa.String(length=255), nullable=True),
    sa.Column('itinerary_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['itinerary_id'], ['itinerary.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('itinerary_place')
    # ### end Alembic commands ###