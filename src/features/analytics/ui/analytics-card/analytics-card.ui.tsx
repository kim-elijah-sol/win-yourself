import clsx from 'clsx';
import { children, Component, JSX } from 'solid-js';
import { FLOW_BG_100, FLOW_BG_300 } from '~/shared/constant';
import { capitalize } from '~/shared/fx';
import type { FlowColor, FlowType, Nullable } from '~/shared/types';
import {
  CheckCheck,
  ChevronsDown,
  ChevronsUp,
  WandSparkles,
} from '~/shared/ui';

type Props = {
  color: FlowColor;
  name: string;
  children: JSX.Element;
  type: FlowType;
  targetCount: Nullable<number>;
};

export const AnalyticsCard: Component<Props> = (props) => {
  return (
    <div
      class={clsx(
        'overflow-hidden w-full rounded-lg',
        FLOW_BG_100[props.color]
      )}
    >
      <div
        class={clsx(
          'pl-4 pr-2 py-2 flex items-center justify-between',
          FLOW_BG_300[props.color]
        )}
      >
        <div>
          <p class='font-semibold text-white mb-1'>{props.name}</p>
          <div class='flex items-center'>
            <TypeLabel type={props.type} />
            {props.targetCount && (
              <div class='flex items-center font-semibold text-[12px] text-white/75'>
                <div class='bg-white/75 w-1 h-1 rounded-full mx-2' />{' '}
                {props.targetCount}
              </div>
            )}
          </div>
        </div>

        <div class='p-[6px] rounded-[25%] transition-all active:bg-[#FFFFFF30] active:scale-90'>
          <WandSparkles />
        </div>
      </div>
      <div class='px-2'>{children(() => props.children)()}</div>
    </div>
  );
};

const TypeLabel: Component<{ type: FlowType }> = (props) => {
  const TypeIcon =
    props.type === 'COMPLETE'
      ? CheckCheck
      : props.type === 'OVER'
      ? ChevronsUp
      : ChevronsDown;

  return (
    <div class='flex items-center gap-1'>
      <TypeIcon className='stroke-white/75' size={16} strokeWidth={2} />
      <span class='font-semibold text-[12px] text-white/75'>
        {capitalize(props.type)} Type
      </span>
    </div>
  );
};
