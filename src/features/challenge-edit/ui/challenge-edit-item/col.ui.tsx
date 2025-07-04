import clsx from 'clsx';
import { format } from 'date-fns';
import { type Accessor, type Component } from 'solid-js';
import { ChallengeEditType } from '~/entities/challenge-edit';
import { getWeekWriting } from '~/features/new-challenge-item/fx';
import {
  FLOW_ACTIVE_TEXT_400,
  FLOW_BG_400,
  FLOW_DAY,
  FLOW_MONTH,
} from '~/shared/constant';
import type { FlowColor, FlowIntervalType } from '~/shared/types';
import { CheckCheck, ChevronsDown, ChevronsUp, X } from '~/shared/ui';
import { Pencil } from '~/shared/ui/icons/pencil.ui';
import { capitalize } from '../../fx';

type Props = {
  color: Accessor<FlowColor>;
  onClickDelete: () => void;
  onClickEdit: () => void;
} & Omit<ChallengeEditType.GetChallengeItemResponseItem, 'id'>;

export const Col: Component<Props> = (props) => {
  const color = () => props.color();

  const getTextForIntervalType = (value: FlowIntervalType) => {
    return (
      {
        YEARLY: 'Year',
        MONTHLY: 'Month',
        WEEKLY: 'Week',
        DAILY: 'Day',
      } as const
    )[value];
  };

  const intervalTypeText = () => getTextForIntervalType(props.intervalType);

  const intervalText = () => {
    if (props.repeatType === 'EVERY') return `Every ${intervalTypeText()}`;

    if (props.repeatType === 'N')
      return `Every ${props.repeat} ${intervalTypeText()}`;

    return `${props.repeat} ${intervalTypeText()} on, ${
      props.rest
    } ${intervalTypeText()} off`;
  };

  const accumulateTypeText = () =>
    getTextForIntervalType(props.accumulateType ?? 'DAILY');

  const getTypeIcon = () =>
    props.type === 'COMPLETE'
      ? CheckCheck
      : props.type === 'OVER'
      ? ChevronsUp
      : ChevronsDown;

  const buttonClassName =
    'flex-1 p-1 rounded-[42%] border-2 text-white border-white transition-all active:scale-90 active:bg-white';

  return (
    <div
      class={clsx(
        'flex flex-col rounded-[22px] p-3 transition-all',
        FLOW_BG_400[color()]
      )}
    >
      <div class='flex items-start justify-between mb-3'>
        <div class='flex flex-col gap-[2px] pl-1'>
          <p class='font-semibold text-[1.25rem] text-white'>{props.name}</p>

          <div class='flex items-center gap-1'>
            {getTypeIcon()({
              size: 16,
              strokeWidth: 2,
              className: 'stroke-white/80',
            })}
            <span class='font-semibold text-[12px] text-white/80'>
              {capitalize(props.type)} Type
            </span>
          </div>
        </div>
        <div class='flex gap-2 min-w-20'>
          <button
            class={clsx(
              buttonClassName,
              'flex items-center justify-center',
              FLOW_ACTIVE_TEXT_400[color()]
            )}
            onClick={props.onClickEdit}
          >
            <Pencil size={20} stroke='currentColor' />
          </button>
          <button
            class={clsx(buttonClassName, FLOW_ACTIVE_TEXT_400[color()])}
            onClick={props.onClickDelete}
          >
            <X size={24} stroke='currentColor' />
          </button>
        </div>
      </div>

      <div class='flex flex-col px-1 gap-3'>
        {props.type !== 'COMPLETE' && (
          <>
            <p class='font-semibold text-[14px] text-white'>
              Target : {props.targetCount!} {props.unit ?? ''} /{' '}
              {accumulateTypeText()}
            </p>

            <div class='w-full h-[1px] bg-linear-to-r from-transparent via-white to-transparent' />
          </>
        )}

        <div class='flex flex-col gap-1'>
          <p class='font-semibold text-[14px] text-white'>{intervalText()}</p>
          {props.months.length > 0 && (
            <p class='font-semibold text-[12px] text-white'>
              • {props.months.map((it) => FLOW_MONTH[it]).join(', ')}
            </p>
          )}
          {props.weeks.length > 0 && (
            <p class='font-semibold text-[12px] text-white'>
              •{' '}
              {props.weeks
                .map((it) => getWeekWriting(it).replace('Week', ''))
                .join(', ')}{' '}
              Week
            </p>
          )}
          {props.dates.length > 0 && (
            <p class='font-semibold text-[12px] text-white'>
              •{' '}
              {props.dates
                .map((it) => (it === 32 ? 'Last Date' : it))
                .join(', ')}
            </p>
          )}
          {props.days.length > 0 && (
            <p class='font-semibold text-[12px] text-white'>
              • {props.days.map((it) => FLOW_DAY[it]).join(', ')}
            </p>
          )}
        </div>

        <div class='w-full h-[1px] bg-linear-to-r from-transparent via-white to-transparent' />

        <p class='font-semibold text-[14px] text-white'>
          Period :{' '}
          {`${format(props.startAt, 'yyyy.MM.dd')} ~ ${
            props.endAt ? format(props.endAt, 'yyyy.MM.dd') : ''
          }`}
        </p>
      </div>
    </div>
  );
};
