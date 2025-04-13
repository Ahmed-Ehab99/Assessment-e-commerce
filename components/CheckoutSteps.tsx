"use client";

import React, {
  useState,
  Children,
  useRef,
  useLayoutEffect,
  HTMLAttributes,
  ReactNode,
} from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

interface StepperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  initialStep?: number;
  stepLabels?: string[];
  onStepChange?: (step: number) => void;
  onFinalStepCompleted?: () => void;
  stepCircleContainerClassName?: string;
  stepContainerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  backButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  nextButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  backButtonText?: string;
  nextButtonText?: string;
  disableStepIndicators?: boolean;
  renderStepIndicator?: (props: {
    step: number;
    currentStep: number;
    onStepClick: (clicked: number) => void;
    label: string;
  }) => ReactNode;
  validateStep?: (step: number) => boolean | Promise<boolean>;
}

export default function Stepper({
  children,
  initialStep = 1,
  stepLabels = [],
  onStepChange = () => {},
  onFinalStepCompleted = () => {},
  stepCircleContainerClassName = "",
  stepContainerClassName = "",
  contentClassName = "",
  footerClassName = "",
  backButtonProps = {},
  nextButtonProps = {},
  backButtonText = "Back",
  nextButtonText = "Continue",
  disableStepIndicators = false,
  renderStepIndicator,
  validateStep,
  ...rest
}: StepperProps) {
  const [currentStep, setCurrentStep] = useState<number>(initialStep);
  const [direction, setDirection] = useState<number>(0);
  const stepsArray = Children.toArray(children);
  const totalSteps = stepsArray.length;
  const isCompleted = currentStep > totalSteps;
  const isLastStep = currentStep === totalSteps;
  const { toast } = useToast();
  const { i18n } = useTranslation();

  const updateStep = (newStep: number) => {
    setCurrentStep(newStep);
    if (newStep > totalSteps) {
      onFinalStepCompleted();
    } else {
      onStepChange(newStep);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      updateStep(currentStep - 1);
    }
  };

  const handleNext = async () => {
    const isValid = await (validateStep?.(currentStep) ?? true);
    if (!isValid) {
      toast({
        description:
          i18n.language === "ar"
            ? "يرجي إكمال البيانات قبل الانتقال الى الخطوه التاليه"
            : "Please complete the form before continuing.",
        variant: "destructive",
      });
      return;
    }
    if (!isLastStep) {
      setDirection(1);
      updateStep(currentStep + 1);
    }
  };

  const handleComplete = () => {
    setDirection(1);
    updateStep(totalSteps + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center py-40" {...rest}>
      <div
        className={`mx-auto w-full max-w-5xl ${stepCircleContainerClassName}`}
      >
        <div
          className={`${stepContainerClassName} flex w-full items-center border-b border-black/20 px-8 pb-5`}
        >
          {stepsArray.map((_, index) => {
            const stepNumber = index + 1;
            const label = stepLabels?.[index] ?? `Step ${stepNumber}`;
            const isNotLastStep = index < totalSteps - 1;
            return (
              <React.Fragment key={stepNumber}>
                {renderStepIndicator ? (
                  renderStepIndicator({
                    step: stepNumber,
                    currentStep,
                    onStepClick: (clicked) => {
                      setDirection(clicked > currentStep ? 1 : -1);
                      updateStep(clicked);
                    },
                    label,
                  })
                ) : (
                  <StepIndicator
                    step={stepNumber}
                    disableStepIndicators={disableStepIndicators}
                    currentStep={currentStep}
                    onClickStep={(clicked) => {
                      setDirection(clicked > currentStep ? 1 : -1);
                      updateStep(clicked);
                    }}
                    label={label}
                  />
                )}
                {isNotLastStep && (
                  <StepConnector isComplete={currentStep > stepNumber} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        <StepContentWrapper
          isCompleted={isCompleted}
          currentStep={currentStep}
          direction={direction}
          className={`space-y-2 px-8 ${contentClassName}`}
        >
          {stepsArray[currentStep - 1]}
        </StepContentWrapper>

        {!isCompleted && (
          <div className={`px-8 pb-8 ${footerClassName}`}>
            <div
              className={`mt-10 flex ${
                currentStep !== 1 ? "justify-between" : "justify-end"
              }`}
            >
              {currentStep !== 1 && (
                <button
                  onClick={handleBack}
                  className="duration-350 rounded-full bg-primary px-3.5 py-1.5 font-medium tracking-tight text-white transition hover:bg-primary/80"
                  {...backButtonProps}
                >
                  {backButtonText}
                </button>
              )}
              {isLastStep ? null : (
                <button
                  onClick={isLastStep ? handleComplete : handleNext}
                  className="duration-350 rounded-full bg-primary px-3.5 py-1.5 font-medium tracking-tight text-white transition hover:bg-primary/80"
                  {...nextButtonProps}
                >
                  {nextButtonText}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface StepContentWrapperProps {
  isCompleted: boolean;
  currentStep: number;
  direction: number;
  children: ReactNode;
  className?: string;
}

function StepContentWrapper({
  isCompleted,
  currentStep,
  direction,
  children,
  className = "",
}: StepContentWrapperProps) {
  const [parentHeight, setParentHeight] = useState<number>(0);

  return (
    <motion.div
      style={{ position: "relative", overflow: "hidden" }}
      animate={{ height: isCompleted ? 0 : parentHeight }}
      transition={{ type: "spring", duration: 0.4 }}
      className={className}
    >
      <AnimatePresence initial={false} mode="sync" custom={direction}>
        {!isCompleted && (
          <SlideTransition
            key={currentStep}
            direction={direction}
            onHeightReady={(h) => setParentHeight(h)}
          >
            {children}
          </SlideTransition>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface SlideTransitionProps {
  children: ReactNode;
  direction: number;
  onHeightReady: (height: number) => void;
}

function SlideTransition({
  children,
  direction,
  onHeightReady,
}: SlideTransitionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (containerRef.current) {
      onHeightReady(containerRef.current.offsetHeight);
    }
  }, [children, onHeightReady]);

  return (
    <motion.div
      ref={containerRef}
      custom={direction}
      variants={stepVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.4 }}
      style={{ position: "absolute", left: 0, right: 0, top: 0 }}
    >
      {children}
    </motion.div>
  );
}

const stepVariants: Variants = {
  enter: (dir: number) => ({
    x: dir >= 0 ? "-100%" : "100%",
    opacity: 0,
  }),
  center: {
    x: "0%",
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir >= 0 ? "50%" : "-50%",
    opacity: 0,
  }),
};

interface StepProps {
  children: ReactNode;
}

export function Step({ children }: StepProps) {
  return <div className="px-8">{children}</div>;
}

interface StepIndicatorProps {
  step: number;
  currentStep: number;
  onClickStep: (clicked: number) => void;
  disableStepIndicators?: boolean;
  label?: string;
}

function StepIndicator({
  step,
  currentStep,
  onClickStep,
  disableStepIndicators = false,
  label,
}: StepIndicatorProps) {
  const status =
    currentStep === step
      ? "active"
      : currentStep < step
        ? "inactive"
        : "complete";

  const handleClick = () => {
    if (step !== currentStep && !disableStepIndicators) {
      onClickStep(step);
    }
  };

  return (
    <motion.div
      onClick={handleClick}
      className={cn(
        status === "complete" && "rounded-full bg-[#DAFFDB] p-1 md:pr-2",
        "relative flex cursor-pointer items-center gap-2 outline-none focus:outline-none",
      )}
      animate={status}
      initial={false}
    >
      <motion.div
        variants={{
          inactive: { scale: 1 },
          active: { scale: 1 },
          complete: { scale: 1, backgroundColor: "#1EC815" },
        }}
        transition={{ duration: 0.3 }}
        className={cn(
          status === "complete" ? "border-none" : "border-2 border-[#D0D0D0]",
          "flex h-8 w-8 items-center justify-center rounded-full font-semibold",
        )}
      >
        {status === "complete" && <CheckIcon className="h-4 w-4 text-white" />}
      </motion.div>
      <span
        className={cn(
          status === "active" ? "opacity-70" : "opacity-40",
          status === "complete" && "text-black",
          "hidden text-sm font-semibold uppercase md:block",
        )}
      >
        {label}
      </span>
    </motion.div>
  );
}

interface StepConnectorProps {
  isComplete: boolean;
}

function StepConnector({ isComplete }: StepConnectorProps) {
  const lineVariants: Variants = {
    incomplete: { width: 0, backgroundColor: "transparent" },
    complete: { width: "100%", backgroundColor: "#DAFFDB" },
  };

  return (
    <div className="relative mx-2 h-0.5 flex-1 overflow-hidden rounded bg-[#D0D0D0]">
      <motion.div
        className="absolute left-0 top-0 h-full"
        variants={lineVariants}
        initial={false}
        animate={isComplete ? "complete" : "incomplete"}
        transition={{ duration: 0.4 }}
      />
    </div>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          delay: 0.1,
          type: "tween",
          ease: "easeOut",
          duration: 0.3,
        }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}
