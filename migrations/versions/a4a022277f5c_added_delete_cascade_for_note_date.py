"""Added delete cascade for Note & Date

Revision ID: a4a022277f5c
Revises: 709f4a31bf4d
Create Date: 2024-06-13 17:34:03.384020

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a4a022277f5c'
down_revision: Union[str, None] = '709f4a31bf4d'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('date', schema=None) as batch_op:
        batch_op.alter_column('place_id',
               existing_type=sa.INTEGER(),
               nullable=True)
        batch_op.drop_constraint('date_place_id_fkey', type_='foreignkey')
        batch_op.create_foreign_key(None, 'itinerary_place', ['place_id'], ['id'], ondelete='CASCADE')

    with op.batch_alter_table('note', schema=None) as batch_op:
        batch_op.alter_column('place_id',
               existing_type=sa.INTEGER(),
               nullable=True)
        batch_op.drop_constraint('note_place_id_fkey', type_='foreignkey')
        batch_op.create_foreign_key(None, 'itinerary_place', ['place_id'], ['id'], ondelete='CASCADE')

    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('note', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('note_place_id_fkey', 'itinerary_place', ['place_id'], ['id'])
        batch_op.alter_column('place_id',
               existing_type=sa.INTEGER(),
               nullable=False)

    with op.batch_alter_table('date', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('date_place_id_fkey', 'itinerary_place', ['place_id'], ['id'])
        batch_op.alter_column('place_id',
               existing_type=sa.INTEGER(),
               nullable=False)

    # ### end Alembic commands ###