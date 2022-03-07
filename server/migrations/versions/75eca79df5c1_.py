"""empty message

Revision ID: 75eca79df5c1
Revises: e549de145067
Create Date: 2022-02-26 18:51:05.864485

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '75eca79df5c1'
down_revision = 'e549de145067'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('classes', sa.Column('create_time', sa.DateTime(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('classes', 'create_time')
    # ### end Alembic commands ###