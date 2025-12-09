-- Function to ensure only one address is default per user
CREATE OR REPLACE FUNCTION public.handle_default_address()
RETURNS TRIGGER AS $$
BEGIN
    -- Only proceed if the new address is being set as default
    IF NEW.is_default = true THEN
        -- Set is_default to false for all other addresses belonging to this user
        -- We exclude the current record ID (for updates) to avoid self-conflict, 
        -- though in a BEFORE trigger it's strictly the logic that runs first.
        UPDATE public.addresses
        SET is_default = false
        WHERE user_id = NEW.user_id
        AND id != NEW.id; -- Important for updates
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to run the function before insertion or update
DROP TRIGGER IF EXISTS on_address_default_change ON public.addresses;

CREATE TRIGGER on_address_default_change
BEFORE INSERT OR UPDATE ON public.addresses
FOR EACH ROW
EXECUTE FUNCTION public.handle_default_address();
